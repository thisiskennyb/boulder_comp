from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from boulder.models import Boulder
from boulder.serializers import BoulderSerializer



class CragsListView(APIView):
    """
    This view returns a list of the available crag options to choose from
    
    Request Data: None, GET REQUEST
    
    Returns: list of crag names, 200 OK 
    """
    
    def get(self, request):
        
        crags = Boulder.objects.values_list('crag', flat=True).distinct()
        
        crags_list = list(crags)
        
        return Response(crags_list, status=status.HTTP_200_OK)
    
    

class CragBouldersView(APIView):
    """
    This view gets all of the boulders for a crag

    Request Data: crag: string, required
    
    Returns: List of Boulder objects associated with crag, 200 OK
    
    """
    
    def get(self, request):
        
        try:
            crag = request.data['crag']
        except KeyError:
            return Response({"error": "Crag data missing"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            boulders = Boulder.objects.filter(crag=crag)
            serializer = BoulderSerializer(boulders, many=True)
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Boulder.DoesNotExist:
            return Response({"message": "There was en error retrieving boulders"}, status=status.HTTP_404_NOT_FOUND)
            