from rest_framework import serializers
from .models import League
from send.models import Send
from boulder.models import Boulder
from django.contrib.auth.models import User

class BoulderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boulder
        fields = '__all__'

class SendSerializer(serializers.ModelSerializer):
    boulder = BoulderSerializer()
    class Meta:
        model = Send
        fields = ['id', 'user', 'boulder', 'send_date', 'flash', 'score']

class UserSerializer(serializers.ModelSerializer):
    sends = SendSerializer(many=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'sends']  # Add more fields as needed

class LeagueSerializer(serializers.ModelSerializer):
    participants = UserSerializer(many=True)

    class Meta:
        model = League
        fields = '__all__'
