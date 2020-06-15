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

31 d Cinex
27 pr Tokidoki
32 h Prestingrass
27 pa Berdus
27 pa Odindenstore

27 w Donney
28 pr Tokidoki
28 lock Darkchaos
27 m Friezy
25 pa Lulli

29 w Hoobachus
28 pr Tokidoki
28 pa Aauron
23 lock Bubbles
21 lock Lokotamtam

60 w Robynne
29 w Blokkade
31 pa Eldairlight
28 pr Tokidoki
27 d Softrock

30 pa Aaros
29 pr Tokidoki
30 m Haaranoja
26 pa Blackbean
24 pa Attomx

33 r Akimboblade
30 pr Tokidoki
27 pa Blackbean
31 m Rihanna
28 pr Japiekrekel

33 w Brutmann
31 pr Tokidoki
35 lock Contre
32 m Imbaby
31 m Esfahan

30 w Kyrush
31 pr Tokidoki
38 r Morathian
32 m Wiles
30 w Unclerat

34 d Keyleth
31 tr Tokidoki
31 lock Neliza
30 d Ziream
29 r Juret
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
