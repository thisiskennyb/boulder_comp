from selenium import webdriver
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from clean import clean_csv
import pandas as pd



#Change as needed
area = 'pot-point'

def update_csv(climbing_data, csv_filename):
    try:
        existing_df = pd.read_csv(csv_filename)
    except FileNotFoundError:
        existing_df = None

    new_df = pd.DataFrame(climbing_data)

    # Convert 'ascents' column to string type in both DataFrames
    if existing_df is not None:
        existing_df['ascents'] = existing_df['ascents'].astype(str)
    new_df['ascents'] = new_df['ascents'].astype(str)

    # Check if both existing_df and new_df are not None
    if existing_df is not None and not new_df.empty:
        # Merge the existing DataFrame and new DataFrame on common columns to find the intersection
        merged_df = pd.merge(existing_df, new_df, on=['crag', 'name', 'grade', 'ascents'], how='outer', indicator=True)

        # Keep only the rows that are unique to the new DataFrame
        new_df = merged_df[merged_df['_merge'] == 'right_only'].drop(columns='_merge')

    # Check if new_df is not empty after removing duplicates
    if not new_df.empty:
        # Append the new data to the existing DataFrame or create a new DataFrame if it doesn't exist
        if existing_df is None:
            existing_df = new_df
        else:
            existing_df = pd.concat([existing_df, new_df], ignore_index=True)

        # Write the DataFrame to the CSV file
        existing_df.to_csv(f'climbing_areas_input/{csv_filename}', index=False)



def getClimbingData(crag):
    #Temporarily using dictionary to see if script is updating properly
    climbing_data = {
        'crag': crag,
        'name': [],
        'grade': [],
        'ascents': []
    }
    # Start with known base url for area
    base_url = f'https://www.8a.nu/crags/bouldering/united-states/{crag}/routes'
    current_page = 1 #We will use this to determine when to stop loading new pages
    
    #Initial browser to grab first page
    browser = webdriver.Chrome()
    #Make initial request to climbing area
    browser.get(base_url)
    #Wait to make sure table data is present
    table_elem = WebDriverWait(browser, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, 'main-table')))


    html_content = browser.page_source #Grab all the HTML from this page
    #Close the browser, we should have all the HTML from this page now
    browser.quit()
    #Create an instance of soup to parse HTML
    soup = BeautifulSoup(html_content, 'html.parser')
    
    #Check our page numbers to determine how many pages we need to loop through
    pages = soup.find_all('div', class_='page-item')
    pages = [page.get_text(strip=True) for page in pages]
    
    #Variable for last page improves logic readability
    last_page = int(pages[-1])
    
    #################################################################################
    # Finish getting the Names, Grades, and Ascents from the first page
    
    ## Getting Names
    names = soup.find_all('p', class_='name-link')

    names = [name.get_text(strip=True) for name in names]
    
    for name in names:
        climbing_data['name'].append(name)
        
    ## Getting Grades
    grades = soup.find_all('td', class_='col-grade')

    grades = [grade.get_text(strip=True) for grade in grades]
    
    for grade in grades:
        climbing_data['grade'].append(grade)
        
    ## Getting Ascents
    
    ascents = soup.find_all('td', class_='col-ascents')

    ascents = [ascent.get_text(strip=True) for ascent in ascents]
    
    for ascent in ascents:
        climbing_data['ascents'].append(ascent)
        
    ################################################################
    #Above completes a cycle of 'page-logic' for our scraping
    ## At this point we want to increment current page because we are done with page 1
    current_page += 1
    #We want to iterate until we have processed the last page
    while current_page <= last_page:
        browser = webdriver.Chrome()
        browser.get(f'{base_url}?page={current_page}')
        table_elem = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CLASS_NAME, 'main-table')))
        html_content = browser.page_source 
        browser.quit()
        ## Create Soup In Loop
        soup = BeautifulSoup(html_content, 'html.parser')
        # Get Names
        names = soup.find_all('p', class_='name-link')
        names = [name.get_text(strip=True) for name in names]
        for name in names:
            climbing_data['name'].append(name)
        ## Get Grades
        grades = soup.find_all('td', class_='col-grade')
        grades = [grade.get_text(strip=True) for grade in grades]
        for grade in grades:
            climbing_data['grade'].append(grade)
        ### Get Ascents
        ascents = soup.find_all('td', class_='col-ascents')
        ascents = [ascent.get_text(strip=True) for ascent in ascents]
        for ascent in ascents:
            climbing_data['ascents'].append(ascent)
        #### Increment current page
        current_page += 1
 
    
    return climbing_data
    
    
    
climbing_data = getClimbingData(f'{area}')
update_csv(climbing_data, f'{area}-input.csv')
clean_csv(f'{area}-input.csv', f'{area}')





