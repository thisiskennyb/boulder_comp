from rest_framework import serializers
from .models import Boulder, Send

class BoulderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boulder
        fields = '__all__'

class SendSerializer(serializers.ModelSerializer):
    boulder = BoulderSerializer()  # Nested serializer for Boulder

    class Meta:
        model = Send
        fields = '__all__'
