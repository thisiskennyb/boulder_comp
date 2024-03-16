from rest_framework import serializers
from .models import Boulder, Send
from django.contrib.auth.models import User

class BoulderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boulder
        fields = '__all__'

class SendSerializer(serializers.ModelSerializer):
    boulder = BoulderSerializer()  # Nested serializer for Boulder
    username = serializers.SerializerMethodField()

    class Meta:
        model = Send
        fields = '__all__'
    # This method is caled by the SerializerMethodField to get the username for each send object
    def get_username(self, obj):
        return obj.user.username