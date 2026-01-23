# State Modeling Drill: Order Lifecycle
# Scenario

# You are modeling the lifecycle of an order in the system.
# An order represents a customer’s laundry request.
# Orders move through the system over time and are handled by different teams.

# Step 1: Define the states

# Question 1
# What are the minimum set of states an order needs?

# Do not overthink.
# List them.

# (Example format)
# - pending
# - scheduled
# - picked_up
# - delivered
# - canceled

# Tell me your list, and why each one exists.

# Step 2: Valid transitions

# Now assume your states exist.

# Question 2
# Which transitions are allowed?

# For example:
# pending → scheduled ✅
# scheduled → delivered ❌

# Walk through:
# the happy path
# cancellations
# rescheduling

# You can describe this in words. No diagrams required.

# Step 3: Invalid transitions

# Question 3
# Name two transitions that should never be allowed, and explain why.
# This tests whether you’re thinking about correctness.

# Step 4: Source of truth

# Question 4
# Where is the source of truth for an order’s state?

# Choose one and explain:

# derived from timestamps?
# stored explicitly?
# inferred from related records?

# Step 5: Failure handling

# Question 5
# What happens if something fails halfway through?

# Example:
# - Order is marked picked_up
# = But the pickup assignment update fails

# Do you:
# - roll back?
# - mark an error?
# - leave it inconsistent?

# Explain your choice.

# Step 6: One sentence summary

# Finally, answer this:
# What is your guiding principle when modeling state?

# One sentence.