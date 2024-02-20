from django.test import TestCase
from boulder.models import Boulder

# Create your tests here.

class TestBoulder(TestCase):

    def test_creating_boulder(self):
        croc_bloc = Boulder.objects.create(
            name='Croc Bloc',
            grade='v5',
            crag='RockTown'
        )
        self.assertIsInstance(croc_bloc, Boulder)

    def test_creating_multiple_boulder_same_name(self):
        #This should only happen if a query of the Boulder name does not return a Boulder due to spelling or case.
        #In the event this happens, our users will not be affected as we will just create another Boulder
        

        Boulder.objects.create(
            name='Croc Bloc',
            grade='v5',
            crag='RockTown'
        )

        Boulder.objects.create(
            name='Crock Block',
            grade='v5',
            crag='RockTown'
        )

        Boulder.objects.create(
            name='Crok Blok',
            grade='v5',
            crag='RockTown'
        )

        Boulder.objects.create(
            name='Crok Blok',
            grade='v5',
            crag='RockTown'
        )

        self.assertEqual(Boulder.objects.count(), 4)

    def test_creating_invalid_boulder(self):
        Boulder.objects.create(
            name=32,
            grade=5.11,
            crag='RockTown'
        )
                   #### Implement dropdown for grade on front end for request
        # self.assertEqual(Boulder.objects.count(), 0)    #### need validation for boulder fields, grade is important ####

        self.assertEqual(Boulder.objects.count(), 1)
