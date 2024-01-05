from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework import serializers
from django.core.validators import EmailValidator
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class SignupSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)
    email = serializers.EmailField(write_only=True, validators=[EmailValidator()])
    confirm_password = serializers.CharField(write_only=True)

    def validate(self, data):
        # Check if password and confirm_password match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data

    class Meta:
        model = User
        fields = ['username', 'password', 'confirm_password', 'email']



# For changing password
class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        # Validate the new password using Django's password validators
        try:
            validate_password(value, user=self.context['request'].user)
        except ValidationError as e:
            raise serializers.ValidationError(detail=e.messages)
        return value