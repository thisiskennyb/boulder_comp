# Generated by Django 4.2.5 on 2024-02-20 08:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('team', '0004_alter_team_members'),
        ('league', '0004_league_moderator'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='league',
            name='teams',
        ),
        migrations.AddField(
            model_name='league',
            name='teams',
            field=models.ManyToManyField(blank=True, to='team.team'),
        ),
    ]
