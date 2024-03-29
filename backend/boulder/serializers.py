from rest_framework import serializers
from boulder.models import Boulder

class BoulderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Boulder
        fields = '__all__'


