from rest_framework import serializers
from .models import Team, League

class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Team
        fields = '__all__'

class LeagueSerializer(serializers.ModelSerializer):
    team = TeamSerializer(many=True, required=False)  # Nested serializer for Boulder

    class Meta:
        model = League
        fields = '__all__'