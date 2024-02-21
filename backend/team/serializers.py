from rest_framework import serializers
from league.serializers import UserSerializer
from team.models import Team



class TeamSerializer(serializers.ModelSerializer):
    members = serializers.SerializerMethodField()
    
    class Meta:
        model = Team
        fields = '__all__'

    def get_members(self, obj):
        # Retrieve all members of the team
        members = obj.members.all()
        # Serialize basic information about each member
        serialized_members = UserSerializer(members, many=True).data
        return serialized_members