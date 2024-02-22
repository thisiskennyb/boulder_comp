from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import UserDashboard
from send.models import Send
from boulder.models import Boulder
from send.serializers import SendSerializer


class SendView(APIView):

    def get(self, request):
         user = request.user
         user_sends = Send.objects.filter(user=user)
         serializer = SendSerializer(user_sends, many=True)
         return Response(serializer.data, status=status.HTTP_200_OK)




#     Query user to get highest grade
# Use dictionary for scoring (Compare dictionary of appropriate grade for scoring?)
# We will check the send grade, against their highest grade
# If send grade > highest grade, we need to add the difference to 3
# If send grade <= highest grade, send_grade - (highestscore - 3) where highest score is the key of the users highest grade
# { 
# V1: 1,
# V2: 2,
# …
# }


    def post(self, request):
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

        }
        user = request.user
        #These are for boulder
        name = request.data['name']
        grade = request.data['grade']
        crag = request.data['crag']

        #User needs to put in request
        flash = request.data['flash']
        send_date = request.data['send_date']

        try:
            if Boulder.objects.get(name=name):
                boulder = Boulder.objects.get(name=name)
        except Boulder.DoesNotExist:
                boulder = Boulder(name=name, grade=grade, crag=crag)
                boulder.save()
       
        # send_grade - (highestscore - 3)
        user_dashboard = UserDashboard.objects.get(user=user)
        user_highest_grade = user_dashboard.highest_boulder_grade #For getting users highest grade
        boulder_grade = boulder.grade
        score = grade_scoring[boulder_grade] - (grade_scoring[user_highest_grade.lower()] - 3)
        # print(score, "Checking score before send object made, and before flash checked")
        if flash:
            score *= 2
        

        send = Send.objects.create(user=user, boulder=boulder, send_date=send_date, flash=flash, score=score)
        send.save()

        serializer = SendSerializer(send)

        return Response(serializer.data, status=status.HTTP_201_CREATED) #Update status later


class ValidSendView(APIView):
    ## Going to start_date and end_date in request
    def post(self, request):
        user = request.user
        data = request.data
        print(request.data, 'this is data')

        print(Send.objects.filter(user=user), 'original list of send objects before filter')
        
        start_date = data['start_date']
        end_date = data['end_date']
        print(start_date, 'this is start')
        print(end_date, 'this is end')

        filtered_user_sends = Send.objects.filter(user=user, send_date__range=[start_date, end_date])
        print(filtered_user_sends, 'THIS IS OUR NEW VIEW')

        # Convert start and end dates to datetime objects and make them timezone-aware
        print(filtered_user_sends, 'if something did not break')
        serializer = SendSerializer(filtered_user_sends, many=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)



        
        

    
       

