# Compile html, css, and js into one html
# Programme by Vital (Vitaly Pavlovich Ulyanov)

import os

style: str = ''
logic: str = ''
indentation: str = '    ' * 3

current_dir: str = os.path.dirname(__file__)
source_dir: str = os.path.join(current_dir, 'source')
target_dir: str = os.path.join(current_dir, 'target')
style_path: str = os.path.join(current_dir, 'resources/VitalStyle.css')
logic_path: str = os.path.join(current_dir, 'resources/VitalLogic.js')

delete_style: str = "<link rel='stylesheet' href='../resources/VitalStyle.css' />"
replace_style: str = '<style>'
replace_logic: str = '<script src=\'../resources/VitalLogic.js\'></script>'

os.system('cls')

with open(style_path, encoding='utf-8') as style_file:
    for sl in style_file.readlines():
        style += f'{indentation}{sl}'

with open(logic_path, encoding='utf-8') as logic_file:
    for ll in logic_file.readlines():
        logic += f'{indentation}{ll}'

for file in os.listdir(source_dir):
    file_path: str = os.path.join(source_dir, file)

    if os.path.isfile(file_path):
        source: str = ''
        target: str = ''
        destination_dir: str = os.path.join(
            target_dir, os.path.splitext(os.path.basename(file))[0]
        )
        destination_file: str = os.path.join(
            target_dir, os.path.splitext(os.path.basename(file))[0], os.path.basename(file)
        )

        if not os.path.exists(destination_dir):
            os.makedirs(destination_dir)

        with open(file_path, encoding='utf-8') as source_file:
            source = source_file.read()

        os.chdir(destination_dir)

        try:
            with open(destination_file, 'w', encoding='utf-8') as target_file:
                target = source.replace(
                    delete_style, ''
                ).replace(
                    replace_style, f'{replace_style}\n{style}\n'
                ).replace(
                    replace_logic, f'<script>\n{logic}\n        </script>'
                )
                target_file.write(target)

            print(f'> File {file} compiled successfully!')
        except:
            print(f'! Cannot compile {file}!')