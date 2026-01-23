# Scenario

# You’re building a backend feature for pickup scheduling.

# Customers place orders and choose a pickup time window.
# Each pickup window has a maximum number of orders it can handle.

# You need to safely assign orders to pickup windows.

# Data model (you can adjust slightly if you explain why)
# type Order = {
#   id: number
#   status: "pending" | "scheduled" | "canceled"
#   pickupWindowId?: number
# }

# type PickupWindow = {
#   id: number
#   capacity: number
#   used: number
# }

# Assume all data lives in memory for this exercise.

# Tas
# Write a function:
# - scheduleOrder(orderId: number, pickupWindowId: number): boolean

# Rules
# An order can only be scheduled if the pickup window has remaining capacity
# If scheduling succeeds:
# - the order’s status becomes "scheduled"
# - the window’s used count increases by 1
# If scheduling fails:
# - nothing changes
# - return false
# - Canceled orders do not count toward capacity

# The function must be safe if called multiple times with the same order

from dataclasses import dataclass
from typing import Optional

@dataclass
class Order:
    id: int
    status: str
    pickup_window_id: Optional[int] = None


@dataclass
class PickupWindow:
    id: int
    capacity: int
    used: int

def scheduleOrder(order_id: int, pickup_window_id: int) -> bool:
    ## objects in memory
    order = orders.get(order_id)
    pickup_window = pickup_windows.get(pickup_window_id)

    ## objects from django
    # order = Order.objects.get(id=order_id)
    # pickup_window = PickupWindow.objects.get(id=pickup_window_id)

    # edge cases \ logic guardrails for if params are empty 
    # or order is already scheduled
    if order is None or pickup_window is None:
        return False

    if order.status == "scheduled":
        return True

    if pickup_window.used >= pickup_window.capacity:
        return False

    order.status = "scheduled"
    order.pickup_window_id = pickup_window_id
    pickup_window.used += 1

    return True

# Scenario

# Orders can be rescheduled to a different pickup window.
# All data is in memory.
# Task

# Write a function:
# def reschedule_order(order_id: int, new_pickup_window_id: int) -> bool:

# Rules
# - Only scheduled orders can be rescheduled
# - The new pickup window must have available capacity

# If rescheduling succeeds:
# - decrement used on the old pickup window
# - increment used on the new pickup window
# - update the order’s pickup_window_id

# If rescheduling fails:
# - nothing changes
# - return False

# Rescheduling to the same window should succeed without changing counts

def reschedule_order(order_id: int, new_pickup_window_id: int) -> bool:
    order = orders.get(order_id)
    new_window = pickup_windows.get(new_pickup_window_id)

    if order is None or new_window is None:
        return False

    if order.status != "scheduled":
        return False

    old_window_id = order.pickup_window_id
    old_window = pickup_windows.get(old_window_id)

    if old_window is None:
        return False

    # Same window → succeed, nothing changes
    if old_window_id == new_pickup_window_id:
        return True

    # Check capacity before changing anything
    if new_window.used >= new_window.capacity:
        return False

    # Apply updates
    old_window.used -= 1
    new_window.used += 1
    order.pickup_window_id = new_pickup_window_id

    return True

# Problem: cancel_order

# You are given an in-memory order scheduling system.

# Each order has:
# - id
# - scheduled_window (or None)
# - state (one of: pending, scheduled, picked_up, delivered, canceled)

# The system tracks capacity per time window.

# Task
# Implement a function:

# cancel_order(order_id)
# that cancels an order safely and idempotently.

# Requirements
# - If the order does not exist, return an error.
# - If the order is already canceled, do nothing and return success.
# - If the order is picked_up or delivered, cancellation is not allowed.

# If the order is scheduled:
# - Release capacity for its scheduled window.
# - Clear the scheduled window.
# - Set the order’s state to canceled.
# - Do not leave the system in a partially updated state.

# Constraints
# - In-memory data only.
# - No concurrency primitives.
# - Favor clarity over cleverness.
# - Make state transitions explicit.

def cancel_order(order_id: int) -> bool:
    order = orders.get(order_id)

    if order is None:
        return False

    if order.status == "cancelled":
        return True

    if order.status in ("picked_up", "delivered"):
        return False

    pickup_window_id = order.pickup_window_id
    pickup_window = pickup_windows.get(pickup_window_id)

    if order.status == "scheduled":
        if pickup_window is None:
            return False
        pickup_window.used -= 1
        order.pickup_window_id = None

    # why is order.status = "cancelled" outside the previous code block?
    # 1) Pending orders would never be canceled
    # - A pending order has no pickup window, but it is still cancelable.
    # - Putting the state change inside that block silently skips it.

    # 2) You mix transition logic with cleanup logic
    # - That makes it harder to reason about correctness when the lifecycle grows
    #   (reschedule, retry, recovery, audits).
    order.status = "cancelled"
    return True


# Follow-up questions to expect
# - What happens if cancel_order is called twice?
# - What if cancel_order races with reschedule_order?
# - Would your approach change with a database?
# - Where would retries or guards live in a real system?