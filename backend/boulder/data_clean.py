import pandas as pd
import subprocess


def push_to_github():
    # Define the Git commands
    git_commands = [
        'git add .',
        'git commit -m "committing"',
        'git push origin master'
    ]

    # Execute each Git command
    for command in git_commands:
        result = subprocess.run(command, shell=True)
        if result.returncode != 0:
            print(f"Error executing command: {command}")
            break
        else:
            print(f"Command executed successfully: {command}")


def clean_csv(file, area):
    # Read the CSV file
    df = pd.read_csv(f'climbing_areas_input/{file}')

    # Remove rows where 'name' includes 'N.N.'
    df = df[~df['name'].str.contains('N.N.', case=False)]


    # # Convert all names to lower case
    df['name'] = df['name'].apply(lambda x: x.lower())

    # Remove duplicates but keep the one with the highest number of ascents
    df = df.sort_values(by='ascents', ascending=False).drop_duplicates(subset=['crag', 'name'], keep='first')


    # Define the grade conversion dictionary
    grade_conversion = {
        "5A": "v0",
        "5B": "v1",
        "5C": "v2",
        "6A": "v3",
        "6B": "v4",
        "6B+": "v4",
        "6C": "v5",
        "6C+": "v5",
        "7A": "v6",
        "7A+": "v7",
        "7B": "v8",
        "7B+": "v8",
        "7C": "v9",
        "7C+": "v10",
        "8A": "v11",
        "8A+": "v12",
        "8B": "v13",
        "8B+": "v14",
        "8C": "v15",
        "8C+": "v16"
    }

    # Convert grades based on the dictionary
    df['grade'] = df['grade'].map(grade_conversion)

    # Remove rows with empty 'grade' column
    df = df.dropna(subset=['grade'])


    # Write the cleaned data to a new CSV file in the 'climbing_areas' directory
    df.to_csv(f'climbing_areas_output/{area}.csv', index=False)
    
    push_to_github()






            
