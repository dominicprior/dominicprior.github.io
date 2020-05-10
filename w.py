import re

intro = '''<!DOCTYPE html>
<html>
<head>
<style>
body {
  background-color: black;
}
p {
  font-family: verdana;
  font-size: 20px;
}
.d	{ color: #FF7D0A; }
.h	{ color: #A9D271; }
.m	{ color: #40C7EB; }
.pa	{ color: #F58CBA; }
.pr	{ color: #FFFFFF; }
.r	{ color: #FFF569; }
.lock	{ color: #8787ED; }
.w	{ color: #C79C6E; }
</style>
</head>
<p>
'''

data = '''
23 w Virguel
20 pa Telandros
20 m Fermat
17 h Sagitt
22 lock Limpnudel

22 d Wingears
25 pr Minah
21 m Fermat
21 r Roguerouge
18 m Malfoe

21 w Glue
18 pa Fazendari
22 m Fermat
21 r Zeroorigin
19 w Lyasira

18 w Skollywarr
23 pr Tokidoki
21 h Faulkner
21 pa Bleskoplesk
20 d Baraphant

20 w Forvirrad
23 pr Tokidoki
20 lock Subspecy
20 m Grimmage
18 m Iceilia

21 pa Hammerwolf
24 pr Tokidoki
22 h Kouenthel
21 d Wildclaw
20 pr Zuzszi

20 w Littletinker
24 pr Tokidoki
23 lock Omnipotancy
21 h Dotterel
21 r Cornwallis

27 pa Krass
25 pr Tokidoki
24 h Dotterel
22 r Roguettie
19 w Willbo

23 w Grenam
26 pr Tokidoki
31 h Kimsung
27 m Verryl
22 h Glenmo
'''

print(intro)

for line in re.split('\n', data):
    m = re.match('(\\d+) ([a-z]+) (\\w+)', line)
    if m:
        level = m[1]
        clas = m[2]
        name = m[3]
        print(f'<span class="{clas}">{level}</span> - <span class="{clas}">{name}</span><br>')
    else:
        print('</p><p>.</p><p>')
