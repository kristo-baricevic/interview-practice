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


def scheduleOrder(order_id: int, pickup_window_id: int) -> bool:
    order = orders.get(order_id)
    pickup_window = pickup_windows.get(pickup_window_id)

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

