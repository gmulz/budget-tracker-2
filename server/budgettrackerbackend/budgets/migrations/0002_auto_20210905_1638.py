# Generated by Django 3.2.6 on 2021-09-05 20:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('budgets', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='is_recurring',
            field=models.BooleanField(default=False),
        ),
        migrations.CreateModel(
            name='RecurringExpense',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=255)),
                ('cost', models.FloatField()),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='budgets.category')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='budgets.user')),
            ],
        ),
    ]