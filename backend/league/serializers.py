from rest_framework import serializers
from .models import League
from team.models import Team
from send.models import Send
from boulder.models import Boulder
from django.contrib.auth.models import User
# from accounts.serializers import UserSerializer

## Dummy serializer
class DummySerializer(serializers.ModelSerializer):
    class Meta:
        model = League
        fields = '__all__'


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
        fields = ['id', 'username', 'sends']

class TeamSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    league = DummySerializer()
    captain = UserSerializer()
    
    class Meta:
        model = Team
        fields = '__all__'

    def get_members(self, obj):
        # Retrieve all members of the team
        members = obj.members.all()
        # Serialize basic information about each member
        serialized_members = UserSerializer(members, many=True).data
        return serialized_members

class LeagueSerializer(serializers.ModelSerializer):
    team = TeamSerializer(many=True, required=False)  # Nested serializer for Boulder
    
    class Meta:
        model = League
        fields = '__all__'

    