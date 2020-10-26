#%%
import pandas as pd
import json
import os

#%%
d = pd.read_csv('https://docs.google.com/spreadsheets/d/e/2PACX-1vTUWkdXEwd4X8TqK5CizEjCDU11P1zzVvdMh9ue6Aa9l_hs9ZRJhpZLkJjaqSa_62WSk7VAtwp6AFWr/pub?gid=0&single=true&output=csv')

#%%
d.fillna('', inplace=True)
d.drop(['Unnamed: 6', 'editace', 'korektura'], axis=1, inplace=True)

#%%
present = list(os.listdir('./foto'))

#%%
d['foto'] = d.foto.apply(lambda x: x if x in present else 'face.jpg')

#%%
with open('./data/data.json', 'w', encoding='utf-8') as f:
    f.write(json.dumps(list(d.to_dict(orient='index').values()),  ensure_ascii=False))
# %%
