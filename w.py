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
31 pr Tokidoki
31 lock Neliza
30 d Ziream
29 r Juret

33 pa Ebolar
33 pr Tokidoki
33 m Glittergold
32 d Cryzis
30 w Sosor

18 w Triplebigmac
34 pr Tokidoki
28 h Dotterel
24 d Lebud
23 r Veganstab

32 w Heartache
35 pr Tokidoki
35 pr Limoles
31 pa Rucosto
28 d Herbstealer

34 w Auerbach
35 pr Tokidoki
36 d Elwilda
34 r Bigbattygyal
33 lock Coronavirrus

32 d Sajki
31 pa Valkian
36 pr Tokidoki
34 m Demityrant
34 lock Xielle

42 d Whocares
37 pr Tokidoki
41 pa Orbry
39 m Nodions
39 w Viking

33 w Krstiann
38 pr Tokidoki
36 m Muramana
32 h Dotterel
32 h Namo

39 w Kenath
40 pr Tokidoki
43 m Alg
42 r Yalson
41 w Mightstone

41 w Mightstone
41 pr Tokidoki
44 d Nerafina
36 w Setanta
34 d Oomkins

36 w Setanta
41 pr Tokidoki
34 d Moline
34 d Oomkins
34 lock Coralz

39 d Kuffe
41 pr Tokidoki
41 d Megatronix
41 r Saraguldske
40 lock Platonios

44 w Mightstone
42 pr Tokidoki
42 pa Vodkapal
40 d Vulpes
40 h Itame

60 r Seneric
43 pr Tokidoki
47 m Ozarkh
47 h Dalmond

44 w Bowarrdin
44 pr Tokidoki
54 m Bobdebobbob
45 m Spiritspark
43 r Kooya

60 w Rautakoura
45 pr Tokidoki
30 d Lebud
29 m Spinxxy

30 d Lebud
45 pr Tokidoki
29 m Wiserman
23 lock Indevious
22 d Savi

32 d Lebud
45 pr Tokidoki
36 h Dotterel
34 lock Hakeldama
34 m Deloina

23 w Rainbird
24 pr Mennopaws
20 w Rheyt
20 m Midge
18 h Straylight

24 w Rainbird
19 pr Drmacca
20 pa Horses
18 d Lynz
18 lock Demonfella

35 d Lebud
46 pr Tokidoki
45 h Dotterel
44 m Lost
37 r Vindiesel

49 w Jayquelin
46 pr Tokidoki
45 h Dotterel
42 m Teixeira
41 pa Palamerser

49 w Pridebreeze
46 pr Tokidoki
47 h Dotterel
48 r Nigira
48 pr Mistal

47 w Zorst
47 pr Tokidoki
45 m Tassie
41 h Mommagoose
41 r Nupu

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
