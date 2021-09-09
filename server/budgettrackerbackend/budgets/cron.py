from .models import RecurringExpense, Transaction, Category, User
from datetime import date

def create_recurring_transactions():
    print("asdf")
    recurring_expenses = RecurringExpense.objects.all().values()
    today = date.today().strftime("%Y-%m-%d")
    for expense in recurring_expenses:
        category = Category.objects.get(pk=expense['category_id'])
        user = User.objects.get(pk=expense['user_id'])
        new_transaction = Transaction(description=expense['description'],
                                      cost=expense['cost'],
                                      user=user,
                                      category=category,
                                      date=today)
        new_transaction.save()