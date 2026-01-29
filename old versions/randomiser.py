# Randomise strings order in a list
# Programme by Vital (Vitaly Pavlovich Ulyanov)

import os, random

while True:
    string: str = ''
    prefix: str = '<li>'
    postfix: str = '</li>'
    items: list[str]

    while string == '':
        os.system('cls')
        string = input('> Type the first string to construct a list: ')

        while new_string := input('> Add a string or press Enter to finish: '):
            string += '\n' +  new_string

        items = string.split('\n')
        random.shuffle(items)
        os.system('cls')

        for i in items:
            print(prefix + i + postfix)

        input('\n> Text randomised!')