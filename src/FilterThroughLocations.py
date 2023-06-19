import json

f = open('current.city.list.json')

data = json.load(f)
places_dict = []

for i in data:
    places_dict.append([i['name'] + ", " + i['country'],
                       i['coord']['lon'], i['coord']['lat']])

print(places_dict)

json_dict = json.dumps(places_dict, indent=4, ensure_ascii=False)
print(json_dict)
with open('current.city.list.json', 'w') as outfile:
    outfile.write(json_dict)
