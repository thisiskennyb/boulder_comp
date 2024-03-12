from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserDashboard
from send.models import Send
from boulder.models import Boulder
from send.serializers import SendSerializer


class AllSendsFeedView(APIView):

    def get(self, request):
        """
        This View takes in a request and returns all of the send objects, ordered by date, limited to 10 Sends

        Queries all of the Send Objects that exist
        Orders the Send Objects by send_date
        Return: Up to 10 most recent sends
        """

        try:
            all_sends = Send.objects.all()
            ten_most_recent_sends = all_sends.order_by('-send_date')[:10]
            serializer = SendSerializer(ten_most_recent_sends, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        # If no Sends in database, just return an empty list
        except Send.DoesNotExist:
            return Response([], status=status.HTTP_200_OK)


class SendView(APIView):

    def get(self, request):
         """
         This View takes in a request and returns all of the Send Objects related to a User

         Tries to get all of the Send Objects where user = user from request
         Exception, Returns 200 and Empty list handles the case of no Send Objects

         Returns: Response 200, list of Send Objects, or Empty List if empty
         """
         user = request.user
         try:
            user_sends = Send.objects.filter(user=user)
            serializer = SendSerializer(user_sends, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
         # If no send objects in filter, return an empty list
         except Send.DoesNotExist:
             return Response([], status=status.HTTP_200_OK)
             


    def post(self, request):
        """
        This View takes in a request which will include Boulder name, grade, and crag
        Request Data: 
            name: string, various characters allowed
            grade: string, various characters format - v1, v2..
            crag: string, various chars allowed
            flash: boolean
            send_date: Date Time Object str formatted
        
        
        Tries to query boulder, handling the case of boulder not existing by creating a new Boulder
        Exception: Returns 400, Issue with accessing Request Data

        Tries to query Userdashboard to access highest_boulder_grade for scoring comparison
        Exception: Returns 400, Issue with Dashboard or Issue Accessing highest_boulder_grade

        Calculates score based on grade in grade_scoring_dict - (highest_boulder_grade in grade_scoring_dict - 3)

        Creates a send object with appropriate score

        Returns: 201 Response with Send Object serialized as data
        """
        grade_scoring = {
            "v1": 1,
            "v2": 2,
            "v3": 3,
            "v4": 4,
            "v5": 5,
            "v6": 6,
            "v7": 7,
            "v8": 8,
            "v9": 9,
            "v10": 10,
            "v11": 11,
            "v12": 12,
            "v13": 13,
            "v14": 14,
            "v15": 15,
            "v16": 16,
            "v17": 17,

        }
        user = request.user
        #Check that we can access user data
        try:
            name = request.data['name']
            grade = request.data['grade']
            crag = request.data['crag']
            flash = request.data['flash']
            send_date = request.data['send_date']
            #Return a 400 if we can't access a field
        except KeyError as e:
            return Response({"error": f'Missing required field: {e}'}, status=status.HTTP_400_BAD_REQUEST)

        #Try to get Boulder, or create one if it does not exist

        try:
            if Boulder.objects.get(name=name):
                boulder = Boulder.objects.get(name=name)
        except Boulder.DoesNotExist:
                boulder = Boulder(name=name, grade=grade, crag=crag)
                boulder.save()
       
        # Try to access Users Dashboard and Highest Boulder Grade
        try:
            user_dashboard = UserDashboard.objects.get(user=user)
            user_highest_grade = user_dashboard.highest_boulder_grade #For getting users highest grade
        except UserDashboard.DoesNotExist:
            return Response({"error": "User dashboard information is missing, please update user info"}, status=status.HTTP_400_BAD_REQUEST)
        except KeyError as e:
            return Response({"error": f'Error accessing highest_boulder_grade, please update user info'}, status=status.HTTP_400_BAD_REQUEST)
        
        # We Calculate the Score of a boulder itself based on grade_scoring dict

        # We calculate the users highest_boulder_grade in grade_scoring dict and subtract 3

        # The resulting score is the difference between the grade sent and the users highest_boulder_grade - 3

        # There is logic to prevent negative scores, which is handled by making any value less than 0 assigned to be 0

        score = grade_scoring[grade] - (grade_scoring[user_highest_grade.lower()] - 3)
        # Prevent a negative score from being applied 
        if score < 0:
             score = 0
       # Double score if flash is true
        if flash:
            score *= 2
        

        send = Send.objects.create(user=user, boulder=boulder, send_date=send_date, flash=flash, score=score)
        send.save()

        serializer = SendSerializer(send)

        return Response(serializer.data, status=status.HTTP_201_CREATED) #Update status later
    




        
        

    
       

