// @flow strict
import type { Node } from 'react';
import PropTable from '../components/PropTable.js';
import PageHeader from '../components/PageHeader.js';
import MainSection from '../components/MainSection.js';
import CardPage from '../components/CardPage.js';

const cards: Array<Node> = [];
const card = (c) => cards.push(c);

card(
  <PageHeader
    name="ComboBox"
    description="ComboBox is the combination of a Textfield and an associated Dropdown that allows the user to filter a list when selecting an option. ComboBox allows users to type the full option, type part of the option and narrow the results, or select an option from the list."
    defaultCode={`
function ComboBoxExample(props) {
  const PRONOUNS = [
   "Liam",
  "Noah",
  "William",
  "James",
  "Oliver",
  "Benjamin",
  "Elijah",
  "Lucas",
  "Mason",
  "Logan",
  "Alexander",
  "Ethan",
  "Jacob",
  "Michael",
  "Daniel",
  "Henry",
  "Jackson",
  "Sebastian",
  "Aiden",
  "Matthew",
  "Samuel",
  "David",
  "Joseph",
  "Carter",
  "Owen",
  "Wyatt",
  "John",
  "Jack",
  "Luke",
  "Jayden",
  "Dylan",
  "Grayson",
  "Levi",
  "Isaac",
  "Gabriel",
  "Julian",
  "Mateo",
  "Anthony",
  "Jaxon",
  "Lincoln",
  "Joshua",
  "Christopher",
  "Andrew",
  "Theodore",
  "Caleb",
  "Ryan",
  "Asher",
  "Nathan",
  "Thomas",
  "Leo",
  "Isaiah",
  "Charles",
  "Josiah",
  "Hudson",
  "Christian",
  "Hunter",
  "Connor",
  "Eli",
  "Ezra",
  "Aaron",
  "Landon",
  "Adrian",
  "Jonathan",
  "Nolan",
  "Jeremiah",
  "Easton",
  "Elias",
  "Colton",
  "Cameron",
  "Carson",
  "Robert",
  "Angel",
  "Maverick",
  "Nicholas",
  "Dominic",
  "Jaxson",
  "Greyson",
  "Adam",
  "Ian",
  "Austin",
  "Santiago",
  "Jordan",
  "Cooper",
  "Brayden",
  "Roman",
  "Evan",
  "Ezekiel",
  "Xavier",
  "Jose",
  "Jace",
  "Jameson",
  "Leonardo",
  "Bryson",
  "Axel",
  "Everett",
  "Parker",
  "Kayden",
  "Miles",
  "Sawyer",
  "Jason",
  "Declan",
  "Weston",
  "Micah",
  "Ayden",
  "Wesley",
  "Luca",
  "Vincent",
  "Damian",
  "Zachary",
  "Silas",
  "Gavin",
  "Chase",
  "Kai",
  "Emmett",
  "Harrison",
  "Nathaniel",
  "Kingston",
  "Cole",
  "Tyler",
  "Bennett",
  "Bentley",
  "Ryker",
  "Tristan",
  "Brandon",
  "Kevin",
  "Luis",
  "George",
  "Ashton",
  "Rowan",
  "Braxton",
  "Ryder",
  "Gael",
  "Ivan",
  "Diego",
  "Maxwell",
  "Max",
  "Carlos",
  "Kaiden",
  "Juan",
  "Maddox",
  "Justin",
  "Waylon",
  "Calvin",
  "Giovanni",
  "Jonah",
  "Abel",
  "Jayce",
  "Jesus",
  "Amir",
  "King",
  "Beau",
  "Camden",
  "Alex",
  "Jasper",
  "Malachi",
  "Brody",
  "Jude",
  "Blake",
  "Emmanuel",
  "Eric",
  "Brooks",
  "Elliot",
  "Antonio",
  "Abraham",
  "Timothy",
  "Finn",
  "Rhett",
  "Elliott",
  "Edward",
  "August",
  "Xander",
  "Alan",
  "Dean",
  "Lorenzo",
  "Bryce",
  "Karter",
  "Victor",
  "Milo",
  "Miguel",
  "Hayden",
  "Graham",
  "Grant",
  "Zion",
  "Tucker",
  "Jesse",
  "Zayden",
  "Joel",
  "Richard",
  "Patrick",
  "Emiliano",
  "Avery",
  "Nicolas",
  "Brantley",
  "Dawson",
  "Myles",
  "Matteo",
  "River",
  "Steven",
  "Thiago",
  "Zane",
  "Matias",
  "Judah",
  "Messiah",
  "Jeremy",
  "Preston",
  "Oscar",
  "Kaleb",
  "Alejandro",
  "Marcus",
  "Mark",
  "Peter",
  "Maximus",
  "Barrett",
  "Jax",
  "Andres",
  "Holden",
  "Legend",
  "Charlie",
  "Knox",
  "Kaden",
  "Paxton",
  "Kyrie",
  "Kyle",
  "Griffin",
  "Josue",
  "Kenneth",
  "Beckett",
  "Enzo",
  "Adriel",
  "Arthur",
  "Felix",
  "Bryan",
  "Lukas",
  "Paul",
  "Brian",
  "Colt",
  "Caden",
  "Leon",
  "Archer",
  "Omar",
  "Israel",
  "Aidan",
  "Theo",
  "Javier",
  "Remington",
  "Jaden",
  "Bradley",
  "Emilio",
  "Colin",
  "Riley",
  "Cayden",
  "Phoenix",
  "Clayton",
  "Simon",
  "Ace",
  "Nash",
  "Derek",
  "Rafael",
  "Zander",
  "Brady",
  "Jorge",
  "Jake",
  "Louis",
  "Damien",
  "Karson",
  "Walker",
  "Maximiliano",
  "Amari",
  "Sean",
  "Chance",
  "Walter",
  "Martin",
  "Finley",
  "Andre",
  "Tobias",
  "Cash",
  "Corbin",
  "Arlo",
  "Iker",
  "Erick",
  "Emerson",
  "Gunner",
  "Cody",
  "Stephen",
  "Francisco",
  "Killian",
  "Dallas",
  "Reid",
  "Manuel",
  "Lane",
  "Atlas",
  "Rylan",
  "Jensen",
  "Ronan",
  "Beckham",
  "Daxton",
  "Anderson",
  "Kameron",
  "Raymond",
  "Orion",
  "Cristian",
  "Tanner",
  "Kyler",
  "Jett",
  "Cohen",
  "Ricardo",
  "Spencer",
  "Gideon",
  "Ali",
  "Fernando",
  "Jaiden",
  "Titus",
  "Travis",
  "Bodhi",
  "Eduardo",
  "Dante",
  "Ellis",
  "Prince",
  "Kane",
  "Luka",
  "Kash",
  "Hendrix",
  "Desmond",
  "Donovan",
  "Mario",
  "Atticus",
  "Cruz",
  "Garrett",
  "Hector",
  "Angelo",
  "Jeffrey",
  "Edwin",
  "Cesar",
  "Zayn",
  "Devin",
  "Conor",
  "Warren",
  "Odin",
  "Jayceon",
  "Romeo",
  "Julius",
  "Jaylen",
  "Hayes",
  "Kayson",
  "Muhammad",
  "Jaxton",
  "Joaquin",
  "Caiden",
  "Dakota",
  "Major",
  "Keegan",
  "Sergio",
  "Marshall",
  "Johnny",
  "Kade",
  "Edgar",
  "Leonel",
  "Ismael",
  "Marco",
  "Tyson",
  "Wade",
  "Collin",
  "Troy",
  "Nasir",
  "Conner",
  "Adonis",
  "Jared",
  "Rory",
  "Andy",
  "Jase",
  "Lennox",
  "Shane",
  "Malik",
  "Ari",
  "Reed",
  "Seth",
  "Clark",
  "Erik",
  "Lawson",
  "Trevor",
  "Gage",
  "Nico",
  "Malakai",
  "Quinn",
  "Cade",
  "Johnathan",
  "Sullivan",
  "Solomon",
  "Cyrus",
  "Fabian",
  "Pedro",
  "Frank",
  "Shawn",
  "Malcolm",
  "Khalil",
  "Nehemiah",
  "Dalton",
  "Mathias",
  "Jay",
  "Ibrahim",
  "Peyton",
  "Winston",
  "Kason",
  "Zayne",
  "Noel",
  "Princeton",
  "Matthias",
  "Gregory",
  "Sterling",
  "Dominick",
  "Elian",
  "Grady",
  "Russell",
  "Finnegan",
  "Ruben",
  "Gianni",
  "Porter",
  "Kendrick",
  "Leland",
  "Pablo",
  "Allen",
  "Hugo",
  "Raiden",
  "Kolton",
  "Remy",
  "Ezequiel",
  "Damon",
  "Emanuel",
  "Zaiden",
  "Otto",
  "Bowen",
  "Marcos",
  "Abram",
  "Kasen",
  "Franklin",
  "Royce",
  "Jonas",
  "Sage",
  "Philip",
  "Esteban",
  "Drake",
  "Kashton",
  "Roberto",
  "Harvey",
  "Alexis",
  "Kian",
  "Jamison",
  "Maximilian",
  "Adan",
  "Milan",
  "Phillip",
  "Albert",
  "Dax",
  "Mohamed",
  "Ronin",
  "Kamden",
  "Hank",
  "Memphis",
  "Oakley",
  "Augustus",
  "Drew",
  "Moises",
  "Armani",
  "Rhys",
  "Benson",
  "Jayson",
  "Kyson",
  "Braylen",
  "Corey",
  "Gunnar",
  "Omari",
  "Alonzo",
  "Landen",
  "Armando",
  "Derrick",
  "Dexter",
  "Enrique",
  "Bruce",
  "Nikolai",
  "Francis",
  "Rocco",
  "Kairo",
  "Royal",
  "Zachariah",
  "Arjun",
  "Deacon",
  "Skyler",
  "Eden",
  "Alijah",
  "Rowen",
  "Pierce",
  "Uriel",
  "Ronald",
  "Luciano",
  "Tate",
  "Frederick",
  "Kieran",
  "Lawrence",
  "Moses",
  "Rodrigo",
  "Brycen",
  "Leonidas",
  "Nixon",
  "Keith",
  "Chandler",
  "Case",
  "Davis",
  "Asa",
  "Darius",
  "Isaias",
  "Aden",
  "Jaime",
  "Landyn",
  "Raul",
  "Niko",
  "Trenton",
  "Apollo",
  "Cairo",
  "Izaiah",
  "Scott",
  "Dorian",
  "Julio",
  "Wilder",
  "Santino",
  "Dustin",
  "Donald",
  "Raphael",
  "Saul",
  "Taylor",
  "Ayaan",
  "Duke",
  "Ryland",
  "Tatum",
  "Ahmed",
  "Moshe",
  "Edison",
  "Emmitt",
  "Cannon",
  "Alec",
  "Danny",
  "Keaton",
  "Roy",
  "Conrad",
  "Roland",
  "Quentin",
  "Lewis",
  "Samson",
  "Brock",
  "Kylan",
  "Cason",
  "Ahmad",
  "Jalen",
  "Nikolas",
  "Braylon",
  "Kamari",
  "Dennis",
  "Callum",
  "Justice",
  "Soren",
  "Rayan",
  "Aarav",
  "Gerardo",
  "Ares",
  "Brendan",
  "Jamari",
  "Kaison",
  "Yusuf",
  "Issac",
  "Jasiah",
  "Callen",
  "Forrest",
  "Makai",
  "Crew",
  "Kobe",
  "Bo",
  "Julien",
  "Mathew",
  "Braden",
  "Johan",
  "Marvin",
  "Zaid",
  "Stetson",
  "Casey",
  "Ty",
  "Ariel",
  "Tony",
  "Zain",
  "Callan",
  "Cullen",
  "Sincere",
  "Uriah",
  "Dillon",
  "Kannon",
  "Colby",
  "Axton",
  "Cassius",
  "Quinton",
  "Mekhi",
  "Reece",
  "Alessandro",
  "Jerry",
  "Mauricio",
  "Sam",
  "Trey",
  "Mohammad",
  "Alberto",
  "Gustavo",
  "Arturo",
  "Fletcher",
  "Marcelo",
  "Abdiel",
  "Hamza",
  "Alfredo",
  "Chris",
  "Finnley",
  "Curtis",
  "Kellan",
  "Quincy",
  "Kase",
  "Harry",
  "Kyree",
  "Wilson",
  "Cayson",
  "Hezekiah",
  "Kohen",
  "Neil",
  "Mohammed",
  "Raylan",
  "Kaysen",
  "Lucca",
  "Sylas",
  "Mack",
  "Leonard",
  "Lionel",
  "Ford",
  "Roger",
  "Rex",
  "Alden",
  "Boston",
  "Colson",
  "Briggs",
  "Zeke",
  "Dariel",
  "Kingsley",
  "Valentino",
  "Jamir",
  "Salvador",
  "Vihaan",
  "Mitchell",
  "Lance",
  "Lucian",
  "Darren",
  "Jimmy",
  "Alvin",
  "Amos",
  "Tripp",
  "Zaire",
  "Layton",
  "Reese",
  "Casen",
  "Colten",
  "Brennan",
  "Korbin",
  "Sonny",
  "Bruno",
  "Orlando",
  "Devon",
  "Huxley",
  "Boone",
  "Maurice",
  "Nelson",
  "Douglas",
  "Randy",
  "Gary",
  "Lennon",
  "Titan",
  "Denver",
  "Jaziel",
  "Noe",
  "Jefferson",
  "Ricky",
  "Lochlan",
  "Rayden",
  "Bryant",
  "Langston",
  "Lachlan",
  "Clay",
  "Abdullah",
  "Lee",
  "Baylor",
  "Leandro",
  "Ben",
  "Kareem",
  "Layne",
  "Joe",
  "Crosby",
  "Deandre",
  "Demetrius",
  "Kellen",
  "Carl",
  "Jakob",
  "Ridge",
  "Bronson",
  "Jedidiah",
  "Rohan",
  "Larry",
  "Stanley",
  "Tomas",
  "Shiloh",
  "Thaddeus",
  "Watson",
  "Baker",
  "Vicente",
  "Koda",
  "Jagger",
  "Nathanael",
  "Carmelo",
  "Shepherd",
  "Graysen",
  "Melvin",
  "Ernesto",
  "Jamie",
  "Yosef",
  "Clyde",
  "Eddie",
  "Tristen",
  "Grey",
  "Ray",
  "Tommy",
  "Samir",
  "Ramon",
  "Santana",
  "Kristian",
  "Marcel",
  "Wells",
  "Zyaire",
  "Brecken",
  "Byron",
  "Otis",
  "Reyansh",
  "Axl",
  "Joey",
  "Trace",
  "Morgan",
  "Musa",
  "Harlan",
  "Enoch",
  "Henrik",
  "Kristopher",
  "Talon",
  "Rey",
  "Guillermo",
  "Houston",
  "Jon",
  "Vincenzo",
  "Dane",
  "Terry",
  "Azariah",
  "Castiel",
  "Kye",
  "Augustine",
  "Zechariah",
  "Joziah",
  "Kamryn",
  "Hassan",
  "Jamal",
  "Chaim",
  "Bodie",
  "Emery",
  "Branson",
  "Jaxtyn",
  "Kole",
  "Wayne",
  "Aryan",
  "Alonso",
  "Brixton",
  "Madden",
  "Allan",
  "Flynn",
  "Jaxen",
  "Harley",
  "Magnus",
  "Sutton",
  "Dash",
  "Anders",
  "Westley",
  "Brett",
  "Emory",
  "Felipe",
  "Yousef",
  "Jadiel",
  "Mordechai",
  "Dominik",
  "Junior",
  "Eliseo",
  "Fisher",
  "Harold",
  "Jaxxon",
  "Kamdyn",
  "Maximo",
  "Caspian",
  "Kelvin",
  "Damari",
  "Fox",
  "Trent",
  "Hugh",
  "Briar",
  "Franco",
  "Keanu",
  "Terrance",
  "Yahir",
  "Ameer",
  "Kaiser",
  "Thatcher",
  "Ishaan",
  "Koa",
  "Merrick",
  "Coen",
  "Rodney",
  "Brayan",
  "London",
  "Rudy",
  "Gordon",
  "Bobby",
  "Aron",
  "Marc",
  "Van",
  "Anakin",
  "Canaan",
  "Dario",
  "Reginald",
  "Westin",
  "Darian",
  "Ledger",
  "Leighton",
  "Maxton",
  "Tadeo",
  "Valentin",
  "Aldo",
  "Khalid",
  "Nickolas",
  "Toby",
  "Dayton",
  "Jacoby",
  "Billy",
  "Gatlin",
  "Elisha",
  "Jabari",
  "Jermaine",
  "Alvaro",
  "Marlon",
  "Mayson",
  "Blaze",
  "Jeffery",
  "Kace",
  "Braydon",
  "Achilles",
  "Brysen",
  "Saint",
  "Xzavier",
  "Aydin",
  "Eugene",
  "Adrien",
  "Cain",
  "Kylo",
  "Nova",
  "Onyx",
  "Arian",
  "Bjorn",
  "Jerome",
  "Miller",
  "Alfred",
  "Kenzo",
  "Kyng",
  "Leroy",
  "Maison",
  "Jordy",
  "Stefan",
  "Wallace",
  "Benicio",
  "Kendall",
  "Zayd",
  "Blaine",
  "Tristian",
  "Anson",
  "Gannon",
  "Jeremias",
  "Marley",
  "Ronnie",
  "Dangelo",
  "Kody",
  "Will",
  "Bentlee",
  "Gerald",
  "Salvatore",
  "Turner",
  "Chad",
  "Misael",
  "Mustafa",
  "Konnor",
  "Maxim",
  "Rogelio",
  "Zakai",
  "Cory",
  "Judson",
  "Brentley",
  "Darwin",
  "Louie",
  "Ulises",
  "Dakari",
  "Rocky",
  "Wesson",
  "Alfonso",
  "Payton",
  "Dwayne",
  "Juelz",
  "Duncan",
  "Keagan",
  "Deshawn",
  "Bode",
  "Bridger",
  "Skylar",
  "Brodie",
  "Landry",
  "Avi",
  "Keenan",
  "Reuben",
  "Jaxx",
  "Rene",
  "Yehuda",
  "Imran",
  "Yael",
  "Alexzander",
  "Willie",
  "Cristiano",
  "Heath",
  "Lyric",
  "Davion",
  "Elon",
  "Karsyn",
  "Krew",
  "Jairo",
  "Maddux",
  "Ephraim",
  "Ignacio",
  "Vivaan",
  "Aries",
  "Vance",
  "Boden",
  "Lyle",
  "Ralph",
  "Reign",
  "Camilo",
  "Draven",
  "Terrence",
  "Idris",
  "Ira",
  "Javion",
  "Jericho",
  "Khari",
  "Marcellus",
  "Creed",
  "Shepard",
  "Terrell",
  "Ahmir",
  "Camdyn",
  "Cedric",
  "Howard",
  "Jad",
  "Zahir",
  "Harper",
  "Justus",
  "Forest",
  "Gibson",
  "Zev",
  "Alaric",
  "Decker",
  "Ernest",
  "Jesiah",
  "Torin",
  "Benedict",
  "Bowie",
  "Deangelo",
  "Genesis",
  "Harlem",
  "Kalel",
  "Kylen",
  "Bishop",
  "Immanuel",
  "Lian",
  "Zavier",
  "Archie",
  "Davian",
  "Gus",
  "Kabir",
  "Korbyn",
  "Randall",
  "Benton",
  "Coleman",
  "Markus",
  "Emma",
  "Olivia",
  "Ava",
  "Isabella",
  "Sophia",
  "Charlotte",
  "Mia",
  "Amelia",
  "Harper",
  "Evelyn",
  "Abigail",
  "Emily",
  "Elizabeth",
  "Mila",
  "Ella",
  "Avery",
  "Sofia",
  "Camila",
  "Aria",
  "Scarlett",
  "Victoria",
  "Madison",
  "Luna",
  "Grace",
  "Chloe",
  "Penelope",
  "Layla",
  "Riley",
  "Zoey",
  "Nora",
  "Lily",
  "Eleanor",
  "Hannah",
  "Lillian",
  "Addison",
  "Aubrey",
  "Ellie",
  "Stella",
  "Natalie",
  "Zoe",
  "Leah",
  "Hazel",
  "Violet",
  "Aurora",
  "Savannah",
  "Audrey",
  "Brooklyn",
  "Bella",
  "Claire",
  "Skylar",
  "Lucy",
  "Paisley",
  "Everly",
  "Anna",
  "Caroline",
  "Nova",
  "Genesis",
  "Emilia",
  "Kennedy",
  "Samantha",
  "Maya",
  "Willow",
  "Kinsley",
  "Naomi",
  "Aaliyah",
  "Elena",
  "Sarah",
  "Ariana",
  "Allison",
  "Gabriella",
  "Alice",
  "Madelyn",
  "Cora",
  "Ruby",
  "Eva",
  "Serenity",
  "Autumn",
  "Adeline",
  "Hailey",
  "Gianna",
  "Valentina",
  "Isla",
  "Eliana",
  "Quinn",
  "Nevaeh",
  "Ivy",
  "Sadie",
  "Piper",
  "Lydia",
  "Alexa",
  "Josephine",
  "Emery",
  "Julia",
  "Delilah",
  "Arianna",
  "Vivian",
  "Kaylee",
  "Sophie",
  "Brielle",
  "Madeline",
  "Peyton",
  "Rylee",
  "Clara",
  "Hadley",
  "Melanie",
  "Mackenzie",
  "Reagan",
  "Adalynn",
  "Liliana",
  "Aubree",
  "Jade",
  "Katherine",
  "Isabelle",
  "Natalia",
  "Raelynn",
  "Maria",
  "Athena",
  "Ximena",
  "Arya",
  "Leilani",
  "Taylor",
  "Faith",
  "Rose",
  "Kylie",
  "Alexandra",
  "Mary",
  "Margaret",
  "Lyla",
  "Ashley",
  "Amaya",
  "Eliza",
  "Brianna",
  "Bailey",
  "Andrea",
  "Khloe",
  "Jasmine",
  "Melody",
  "Iris",
  "Isabel",
  "Norah",
  "Annabelle",
  "Valeria",
  "Emerson",
  "Adalyn",
  "Ryleigh",
  "Eden",
  "Emersyn",
  "Anastasia",
  "Kayla",
  "Alyssa",
  "Juliana",
  "Charlie",
  "Esther",
  "Ariel",
  "Cecilia",
  "Valerie",
  "Alina",
  "Molly",
  "Reese",
  "Aliyah",
  "Lilly",
  "Parker",
  "Finley",
  "Morgan",
  "Sydney",
  "Jordyn",
  "Eloise",
  "Trinity",
  "Daisy",
  "Kimberly",
  "Lauren",
  "Genevieve",
  "Sara",
  "Arabella",
  "Harmony",
  "Elise",
  "Remi",
  "Teagan",
  "Alexis",
  "London",
  "Sloane",
  "Laila",
  "Lucia",
  "Diana",
  "Juliette",
  "Sienna",
  "Elliana",
  "Londyn",
  "Ayla",
  "Callie",
  "Gracie",
  "Josie",
  "Amara",
  "Jocelyn",
  "Daniela",
  "Everleigh",
  "Mya",
  "Rachel",
  "Summer",
  "Alana",
  "Brooke",
  "Alaina",
  "Mckenzie",
  "Catherine",
  "Amy",
  "Presley",
  "Journee",
  "Rosalie",
  "Ember",
  "Brynlee",
  "Rowan",
  "Joanna",
  "Paige",
  "Rebecca",
  "Ana",
  "Sawyer",
  "Mariah",
  "Nicole",
  "Brooklynn",
  "Payton",
  "Marley",
  "Fiona",
  "Georgia",
  "Lila",
  "Harley",
  "Adelyn",
  "Alivia",
  "Noelle",
  "Gemma",
  "Vanessa",
  "Journey",
  "Makayla",
  "Angelina",
  "Adaline",
  "Catalina",
  "Alayna",
  "Julianna",
  "Leila",
  "Lola",
  "Adriana",
  "June",
  "Juliet",
  "Jayla",
  "River",
  "Tessa",
  "Lia",
  "Dakota",
  "Delaney",
  "Selena",
  "Blakely",
  "Ada",
  "Camille",
  "Zara",
  "Malia",
  "Hope",
  "Samara",
  "Vera",
  "Mckenna",
  "Briella",
  "Izabella",
  "Hayden",
  "Raegan",
  "Michelle",
  "Angela",
  "Ruth",
  "Freya",
  "Kamila",
  "Vivienne",
  "Aspen",
  "Olive",
  "Kendall",
  "Elaina",
  "Thea",
  "Kali",
  "Destiny",
  "Amiyah",
  "Evangeline",
  "Cali",
  "Blake",
  "Elsie",
  "Juniper",
  "Alexandria",
  "Myla",
  "Ariella",
  "Kate",
  "Mariana",
  "Lilah",
  "Charlee",
  "Daleyza",
  "Nyla",
  "Jane",
  "Maggie",
  "Zuri",
  "Aniyah",
  "Lucille",
  "Leia",
  "Melissa",
  "Adelaide",
  "Amina",
  "Giselle",
  "Lena",
  "Camilla",
  "Miriam",
  "Millie",
  "Brynn",
  "Gabrielle",
  "Sage",
  "Annie",
  "Logan",
  "Lilliana",
  "Haven",
  "Jessica",
  "Kaia",
  "Magnolia",
  "Amira",
  "Adelynn",
  "Makenzie",
  "Stephanie",
  "Nina",
  "Phoebe",
  "Arielle",
  "Evie",
  "Lyric",
  "Alessandra",
  "Gabriela",
  "Paislee",
  "Raelyn",
  "Madilyn",
  "Paris",
  "Makenna",
  "Kinley",
  "Gracelyn",
  "Talia",
  "Maeve",
  "Rylie",
  "Kiara",
  "Evelynn",
  "Brinley",
  "Jacqueline",
  "Laura",
  "Gracelynn",
  "Lexi",
  "Ariah",
  "Fatima",
  "Jennifer",
  "Kehlani",
  "Alani",
  "Ariyah",
  "Luciana",
  "Allie",
  "Heidi",
  "Maci",
  "Phoenix",
  "Felicity",
  "Joy",
  "Kenzie",
  "Veronica",
  "Margot",
  "Addilyn",
  "Lana",
  "Cassidy",
  "Remington",
  "Saylor",
  "Ryan",
  "Keira",
  "Harlow",
  "Miranda",
  "Angel",
  "Amanda",
  "Daniella",
  "Royalty",
  "Gwendolyn",
  "Ophelia",
  "Heaven",
  "Jordan",
  "Madeleine",
  "Esmeralda",
  "Kira",
  "Miracle",
  "Elle",
  "Amari",
  "Danielle",
  "Daphne",
  "Willa",
  "Haley",
  "Gia",
  "Kaitlyn",
  "Oakley",
  "Kailani",
  "Winter",
  "Alicia",
  "Serena",
  "Nadia",
  "Aviana",
  "Demi",
  "Jada",
  "Braelynn",
  "Dylan",
  "Ainsley",
  "Alison",
  "Camryn",
  "Avianna",
  "Bianca",
  "Skyler",
  "Scarlet",
  "Maddison",
  "Nylah",
  "Sarai",
  "Regina",
  "Dahlia",
  "Nayeli",
  "Raven",
  "Helen",
  "Adrianna",
  "Averie",
  "Skye",
  "Kelsey",
  "Tatum",
  "Kensley",
  "Maliyah",
  "Erin",
  "Viviana",
  "Jenna",
  "Anaya",
  "Carolina",
  "Shelby",
  "Sabrina",
  "Mikayla",
  "Annalise",
  "Octavia",
  "Lennon",
  "Blair",
  "Carmen",
  "Yaretzi",
  "Kennedi",
  "Mabel",
  "Zariah",
  "Kyla",
  "Christina",
  "Selah",
  "Celeste",
  "Eve",
  "Mckinley",
  "Milani",
  "Frances",
  "Jimena",
  "Kylee",
  "Leighton",
  "Katie",
  "Aitana",
  "Kayleigh",
  "Sierra",
  "Kathryn",
  "Rosemary",
  "Jolene",
  "Alondra",
  "Elisa",
  "Helena",
  "Charleigh",
  "Hallie",
  "Lainey",
  "Avah",
  "Jazlyn",
  "Kamryn",
  "Mira",
  "Cheyenne",
  "Francesca",
  "Antonella",
  "Wren",
  "Chelsea",
  "Amber",
  "Emory",
  "Lorelei",
  "Nia",
  "Abby",
  "April",
  "Emelia",
  "Carter",
  "Aylin",
  "Cataleya",
  "Bethany",
  "Marlee",
  "Carly",
  "Kaylani",
  "Emely",
  "Liana",
  "Madelynn",
  "Cadence",
  "Matilda",
  "Sylvia",
  "Myra",
  "Fernanda",
  "Oaklyn",
  "Elianna",
  "Hattie",
  "Dayana",
  "Kendra",
  "Maisie",
  "Malaysia",
  "Kara",
  "Katelyn",
  "Maia",
  "Celine",
  "Cameron",
  "Renata",
  "Jayleen",
  "Charli",
  "Emmalyn",
  "Holly",
  "Azalea",
  "Leona",
  "Alejandra",
  "Bristol",
  "Collins",
  "Imani",
  "Meadow",
  "Alexia",
  "Edith",
  "Kaydence",
  "Leslie",
  "Lilith",
  "Kora",
  "Aisha",
  "Meredith",
  "Danna",
  "Wynter",
  "Emberly",
  "Julieta",
  "Michaela",
  "Alayah",
  "Jemma",
  "Reign",
  "Colette",
  "Kaliyah",
  "Elliott",
  "Johanna",
  "Remy",
  "Sutton",
  "Emmy",
  "Virginia",
  "Briana",
  "Oaklynn",
  "Adelina",
  "Everlee",
  "Megan",
  "Angelica",
  "Justice",
  "Mariam",
  "Khaleesi",
  "Macie",
  "Karsyn",
  "Alanna",
  "Aleah",
  "Mae",
  "Mallory",
  "Esme",
  "Skyla",
  "Madilynn",
  "Charley",
  "Allyson",
  "Hanna",
  "Shiloh",
  "Henley",
  "Macy",
  "Maryam",
  "Ivanna",
  "Ashlynn",
  "Lorelai",
  "Amora",
  "Ashlyn",
  "Sasha",
  "Baylee",
  "Beatrice",
  "Itzel",
  "Priscilla",
  "Marie",
  "Jayda",
  "Liberty",
  "Rory",
  "Alessia",
  "Alaia",
  "Janelle",
  "Kalani",
  "Gloria",
  "Sloan",
  "Dorothy",
  "Greta",
  "Julie",
  "Zahra",
  "Savanna",
  "Annabella",
  "Poppy",
  "Amalia",
  "Zaylee",
  "Cecelia",
  "Coraline",
  "Kimber",
  "Emmie",
  "Anne",
  "Karina",
  "Kassidy",
  "Kynlee",
  "Monroe",
  "Anahi",
  "Jaliyah",
  "Jazmin",
  "Maren",
  "Monica",
  "Siena",
  "Marilyn",
  "Reyna",
  "Kyra",
  "Lilian",
  "Jamie",
  "Melany",
  "Alaya",
  "Ariya",
  "Kelly",
  "Rosie",
  "Adley",
  "Dream",
  "Jaylah",
  "Laurel",
  "Jazmine",
  "Mina",
  "Karla",
  "Bailee",
  "Aubrie",
  "Katalina",
  "Melina",
  "Harlee",
  "Elliot",
  "Hayley",
  "Elaine",
  "Karen",
  "Dallas",
  "Irene",
  "Lylah",
  "Ivory",
  "Chaya",
  "Rosa",
  "Aleena",
  "Braelyn",
  "Nola",
  "Alma",
  "Leyla",
  "Pearl",
  "Addyson",
  "Roselyn",
  "Lacey",
  "Lennox",
  "Reina",
  "Aurelia",
  "Noa",
  "Janiyah",
  "Jessie",
  "Madisyn",
  "Saige",
  "Alia",
  "Tiana",
  "Astrid",
  "Cassandra",
  "Kyleigh",
  "Romina",
  "Stevie",
  "Haylee",
  "Zelda",
  "Lillie",
  "Aileen",
  "Brylee",
  "Eileen",
  "Yara",
  "Ensley",
  "Lauryn",
  "Giuliana",
  "Livia",
  "Anya",
  "Mikaela",
  "Palmer",
  "Lyra",
  "Mara",
  "Marina",
  "Kailey",
  "Liv",
  "Clementine",
  "Kenna",
  "Briar",
  "Emerie",
  "Galilea",
  "Tiffany",
  "Bonnie",
  "Elyse",
  "Cynthia",
  "Frida",
  "Kinslee",
  "Tatiana",
  "Joelle",
  "Armani",
  "Jolie",
  "Nalani",
  "Rayna",
  "Yareli",
  "Meghan",
  "Rebekah",
  "Addilynn",
  "Faye",
  "Zariyah",
  "Lea",
  "Aliza",
  "Julissa",
  "Lilyana",
  "Anika",
  "Kairi",
  "Aniya",
  "Noemi",
  "Angie",
  "Crystal",
  "Bridget",
  "Ari",
  "Davina",
  "Amelie",
  "Amirah",
  "Annika",
  "Elora",
  "Xiomara",
  "Linda",
  "Hana",
  "Laney",
  "Mercy",
  "Hadassah",
  "Madalyn",
  "Louisa",
  "Simone",
  "Kori",
  "Jillian",
  "Alena",
  "Malaya",
  "Miley",
  "Milan",
  "Sariyah",
  "Malani",
  "Clarissa",
  "Nala",
  "Princess",
  "Amani",
  "Analia",
  "Estella",
  "Milana",
  "Aya",
  "Chana",
  "Jayde",
  "Tenley",
  "Zaria",
  "Itzayana",
  "Penny",
  "Ailani",
  "Lara",
  "Aubriella",
  "Clare",
  "Lina",
  "Rhea",
  "Bria",
  "Thalia",
  "Keyla",
  "Haisley",
  "Ryann",
  "Addisyn",
  "Amaia",
  "Chanel",
  "Ellen",
  "Harmoni",
  "Aliana",
  "Tinsley",
  "Landry",
  "Paisleigh",
  "Lexie",
  "Myah",
  "Rylan",
  "Deborah",
  "Emilee",
  "Laylah",
  "Novalee",
  "Ellis",
  "Emmeline",
  "Avalynn",
  "Hadlee",
  "Legacy",
  "Braylee",
  "Elisabeth",
  "Kaylie",
  "Ansley",
  "Dior",
  "Paula",
  "Belen",
  "Corinne",
  "Maleah",
  "Martha",
  "Teresa",
  "Salma",
  "Louise",
  "Averi",
  "Lilianna",
  "Amiya",
  "Milena",
  "Royal",
  "Aubrielle",
  "Calliope",
  "Frankie",
  "Natasha",
  "Kamilah",
  "Meilani",
  "Raina",
  "Amayah",
  "Lailah",
  "Rayne",
  "Zaniyah",
  "Isabela",
  "Nathalie",
  "Miah",
  "Opal",
  "Kenia",
  "Azariah",
  "Hunter",
  "Tori",
  "Andi",
  "Keily",
  "Leanna",
  "Scarlette",
  "Jaelyn",
  "Saoirse",
  "Selene",
  "Dalary",
  "Lindsey",
  "Marianna",
  "Ramona",
  "Estelle",
  "Giovanna",
  "Holland",
  "Nancy",
  "Emmalynn",
  "Mylah",
  "Rosalee",
  "Sariah",
  "Zoie",
  "Blaire",
  "Lyanna",
  "Maxine",
  "Anais",
  "Dana",
  "Judith",
  "Kiera",
  "Jaelynn",
  "Noor",
  "Kai",
  "Adalee",
  "Oaklee",
  "Amaris",
  "Jaycee",
  "Belle",
  "Carolyn",
  "Della",
  "Karter",
  "Sky",
  "Treasure",
  "Vienna",
  "Jewel",
  "Rivka",
  "Rosalyn",
  "Alannah",
  "Ellianna",
  "Sunny",
  "Claudia",
  "Cara",
  "Hailee",
  "Estrella",
  "Harleigh",
  "Zhavia",
  "Alianna",
  "Brittany",
  "Jaylene",
  "Journi",
  "Marissa",
  "Mavis",
  "Iliana",
  "Jurnee",
  "Aislinn",
  "Alyson",
  "Elsa",
  "Kamiyah",
  "Kiana",
  "Lisa",
  "Arlette",
  "Kadence",
  "Kathleen",
  "Halle",
  "Erika",
  "Sylvie",
  "Adele",
  "Erica",
  "Veda",
  "Whitney",
  "Bexley",
  "Emmaline",
  "Guadalupe",
  "August",
  "Brynleigh",
  "Gwen",
  "Promise",
  "Alisson",
  "India",
  "Madalynn",
  "Paloma",
  "Patricia",
  "Samira",
  "Aliya",
  "Casey",
  "Jazlynn",
  "Paulina",
  "Dulce",
  "Kallie",
  "Perla",
  "Adrienne",
  "Alora",
  "Nataly",
  "Ayleen",
  "Christine",
  "Kaiya",
  "Ariadne",
  "Karlee",
  "Barbara",
  "Lillianna",
  "Raquel",
  "Saniyah",
  "Yamileth",
  "Arely",
  "Celia",
  "Heavenly",
  "Kaylin",
  "Marisol",
  "Marleigh",
  "Avalyn",
  "Berkley",
  "Kataleya",
  "Zainab",
  "Dani",
  "Egypt",
  "Joyce",
  "Kenley",
  "Annabel",
  "Kaelyn",
  "Etta",
  "Hadleigh",
  "Joselyn",
  "Luella",
  "Jaylee",
  "Zola",
  "Alisha",
  "Ezra",
  "Queen",
  "Amia",
  "Annalee",
  "Bellamy",
  "Paola",
  "Tinley",
  "Violeta",
  "Jenesis",
  "Arden",
  "Giana",
  "Wendy",
  "Ellison",
  "Florence",
  "Margo",
  "Naya",
  "Robin",
  "Sandra",
  "Scout",
  "Waverly",
  "Janessa",
  "Jayden",
  "Micah",
  "Novah",
  "Zora",
  "Ann",
  "Jana",
  "Taliyah",
  "Vada",
  "Giavanna",
  "Ingrid",
  "Valery",
  "Azaria",
  "Emmarie",
  "Esperanza",
  "Kailyn",
  "Aiyana",
  "Keilani",
  "Austyn",
  "Whitley",
  "Elina",
  "Kimora",
  "Maliah"
];
  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: pronoun }));
  const names100Elements = options.slice(0, 100);
  const names500Elements = options.slice(0, 500);
  const names1000Elements = options.slice(0, 1000);
  const names2000Elements = options.slice(0, 2000);

  const [errorMessage, setErrorMessage] = React.useState();

  const handleOnBlur = ({ value }) => {
    if (value !== "" && !PRONOUNS.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = () => (errorMessage ? setErrorMessage() : () => {});

  return (
    <Box width={400}>
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        errorMessage={errorMessage}
        helperText="Choose your pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
        id="header"
        label="Pronouns"
        noResultText="No results for your selection"
        onBlur={handleOnBlur}
        onChange={resetErrorMessage}
        onClear={resetErrorMessage}
        options={names2000Elements}
        placeholder="Add your pronouns"
      />
    </Box>
  );
}
`}
  />,
);

card(
  <PropTable
    props={[
      {
        name: 'options',
        type: 'Array<{| label: string, value: string, subtext: string |}>',
        description:
          'The data for each selection option. See [subtext](#With-subtext) variant to learn more',
        required: true,
      },
      {
        name: 'inputValue',
        type: 'string',
        description:
          'The user input in ComboBox for controlled components. See [controlled ComboBox](#Controlled-vs-Uncontrolled) variant to learn more.',
      },
      {
        name: 'id',
        type: 'string',
        description:
          'Unique id to identify each ComboBox. Used for [accessibility](#Accessibility) purposes.',
        required: true,
      },
      {
        name: 'label',
        type: 'string',
        description: 'Provide a label to identify the ComboBox field.',
        required: true,
      },
      {
        name: 'labelDisplay',
        type: `'visible'|'hidden'`,
        defaultValue: 'visible',
        description:
          'Whether the label should be visible or not. If `hidden`, the label is still available for screen reader users, but does not appear visually. See the [label visibility variant](#Label-visibility) for more info.',
      },
      {
        name: 'disabled',
        type: 'boolean',
        defaultValue: false,
        description:
          'When disabled, ComboBox looks inactive and cannot be interacted with. If tags are passed, they will appear disabled as well and cannot be removed. See [tags](#Tags) variant to learn more.',
      },
      {
        name: 'helperText',
        type: 'string',
        description: 'Provides additional information about how to select a ComboBox option.',
      },
      {
        name: 'accessibilityClearButtonLabel',
        type: 'string',
        required: true,
        description: "Label to describe the clear button's purpose.",
      },
      {
        name: 'errorMessage',
        type: 'string',
        description:
          'Provide feedback when an error on selection occurs. See [error message](#Error-message) variant.',
      },
      {
        name: 'noResultText',
        type: 'string',
        required: true,
        description: 'The text shown when the input value returns no matches',
      },
      {
        name: 'onBlur',
        type:
          '({ event: SyntheticFocusEvent<HTMLInputElement> | SyntheticEvent<HTMLInputElement> , value: string }) => void',
        description: 'Callback when you focus outside the component ',
      },
      {
        name: 'onChange',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        description: 'Callback when user types into the control input field',
      },
      {
        name: 'onClear',
        type: '() => void',
        description: 'Callback when user clicks on clear button',
      },
      {
        name: 'onFocus',
        type: '({ event: SyntheticFocusEvent<>, value: string }) => void',
        description: 'Callback when you focus on the component',
      },
      {
        name: 'onKeyDown',
        type: '({ event: SyntheticKeyboardEvent<HTMLTextAreaElement>, value: string }) => void',
        description: 'Callback for key stroke events. See [tags](#Tags) variant to learn more.',
      },
      {
        name: 'onSelect',
        type: '({ event: SyntheticInputEvent<>, value: string }) => void',
        description: 'Callback when an item is selected',
      },
      {
        name: 'placeholder',
        type: 'string',
        description: 'Specify a short description that suggests the expected input for the field',
      },
      {
        name: 'selectedOption',
        type: '{| label: string, value: string, subtext: string |}',
        description:
          'The selected option in ComboBox for controlled components. See [controlled ComboBox](#Controlled-vs-Uncontrolled) variant to learn more.',
      },
      {
        name: 'size',
        type: '"md" | "lg"',
        description:
          'Defines the height of ComboBox: md: 40px, lg: 48px. Width is defined by parent component.',
        defaultValue: 'md',
      },
      {
        name: 'tags',
        type: 'Array<Element<typeof Tag>>',
        description:
          'List of tags to display in the component. See [tags](#Tags) variant to learn more.',
      },
      {
        name: 'ref',
        type: "React.Ref<'input'>",
        description:
          'Forward the ref to the underlying component container element. See [focus management](#Ref) variant to learn more',
      },
    ]}
  />,
);

card(
  <MainSection name="Usage guidelines">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        title="When to Use"
        description={`
          - Presenting users with a long list of options (typically 10 or more) that can be filtered by typing in the text field.
        `}
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        title="When Not to Use"
        description={`
          - For shorter lists of items where filtering is not needed, typically under 10 items.
        `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Best practices">
    <MainSection.Subsection columns={2}>
      <MainSection.Card
        cardSize="md"
        type="do"
        description="Use ComboBox to allow the user to edit or copy the textfield input values to select and/or narrow down from a given list of options."
      />
      <MainSection.Card
        cardSize="md"
        type="don't"
        description="Use ComboBox for a simple list of items. Use [SelectList](/selectlist) instead for the added native mobile functionality."
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Accessibility">
    <MainSection.Subsection
      title="Labels"
      description={`
      ComboBox requires both \`label\` and \`accessibilityClearButtonLabel\`. By default, the \`label\` is visible above TextField. However, if the form items are labelled by content elsewhere on the page, or a more complex label is needed, the \`labelDisplay\` prop can be used to visually hide the label. In this case, it is still available to screen reader users, but will not appear visually on the screen.

      In the example below, the "Discover this week's top searched trends across all categories" text is acting as a heading, so instead of repeating another label, we visually hide the label. When a user focuses on the ComboBox, a screen reader will announce "Choose a category to display top search trends, Select category".
      `}
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ComboBoxExample(props) {
  const CATEGORIES = [
    'All Categories',
    'Food and drinks',
    'Beauty',
    'Home decor',
    'Fashion',
    'Travel',
    'Art',
    'Quotes',
    'Entertainment',
    'Entertainment',
    'DIY and crafts',
    'Health',
    'Wedding',
    'Event planning',
    'Gardening',
    'Parenting',
    'Vehicles',
    'Design',
    'Sport',
    'Electronics',
    'Animals',
    'Finance',
    'Architecture',
  ];

  const options = CATEGORIES.map((category, index) => ({
    label: category,
    value: 'value'+index ,
  }));

  const [errorMessage, setErrorMessage] = React.useState();

  const handleOnBlur = ({ value }) => {
    if (value !== '' && !CATEGORIES.includes(value))
      setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = () => (errorMessage ? setErrorMessage() : () => {});

  return (
    <Flex
      direction="column"
      gap={2}
    >
      <Heading size="md">Discover this week's top searched trends across all categories</Heading>
      <Text inline> Wanna learn how trends work? Read
        <Text weight="bold" inline>
          <Link accessibilityLabel="Learn how trends on Pinterest work" target="blank" inline href="https://business.pinterest.com/content/pinterest-predicts/">
            additional information
          </Link>
        </Text>
      </Text>
      <ComboBox
        accessibilityClearButtonLabel="Clear category value"
        errorMessage={errorMessage}
        id="displayLabel"
        label="Choose a category to display top search trends"
        labelDisplay="hidden"
        noResultText="No results for your selection"
        onBlur={handleOnBlur}
        onChange={resetErrorMessage}
        onClear={resetErrorMessage}
        options={options}
        placeholder="Select category"
      />
    </Flex>
  );
}
`}
      />
      <MainSection.Subsection
        title="Keyboard interaction"
        description={`
    * Hitting \`Enter\` or \`Space\` key on the ComboBox's trigger opens the options list
    * Once an item is selected, hitting \`Enter\` or \`Space\` on the clear button clears the selection and returns focus to the input textfield
    * \`Escape\` key closes the options list, while moving focus back on the ComboBox's trigger
    * Arrow keys are used to navigate items within the options list
    * \`Enter\` key selects an item within the options list
    * \`Tab\` or \` Shift + Tab\` close the options list and move focus accordingly
  `}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection
    name="Localization"
    description={`Be sure to localize the \`helperText\`, \`errorMessage\`, \`noResultText\`, \`label\`, \`placeholder\`,  and \`accessibilityClearButtonLabel\` props. \`options\` and \`value\` should be localized for those cases that can be translated. Note that localization can lengthen text by 20 to 30 percent.`}
  >
    <MainSection.Card
      cardSize="lg"
      defaultCode={`
function ComboBoxExample(props) {
  const PRONOUNS = [
    'ell@ / l@ / -@',
    'ella / la / le / -a',
    'elle / le / -e',
    'ellx / lx / -x',
    'él / lo / le / -o',
  ];

  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: 'value'+index }));

  const [errorMessage, setErrorMessage] = React.useState();

  const handleOnBlur = ({ value }) => {
    if (value !== "" && !PRONOUNS.includes(value)) setErrorMessage('Por favor, selecciona una opción válida');
  };

  const resetErrorMessage = () => (errorMessage ? setErrorMessage() : () => {});

  return (
    <Box width={400}>
      <ComboBox
        accessibilityClearButtonLabel="Remueve la lista de pronombres seleccionados"
        errorMessage={errorMessage}
        helperText="Elige hasta 2 grupos de pronombres para que aparezcan en tu perfil y otras personas sepan cómo referirse a ti. Puedes editarlos o eliminarlos en cualquier momento."
        id="localization"
        label="Pronombres"
        noResultText="No se encontró ninguna coincidencia"
        onBlur={handleOnBlur}
        onChange={resetErrorMessage}
        onClear={resetErrorMessage}
        options={options}
        placeholder="Añade tus pronombres"
      />
    </Box>

  );
}
`}
    />
  </MainSection>,
);

card(
  <MainSection name="Variants">
    <MainSection.Subsection
      description="ComboBox can be used as a controlled or an uncontrolled component. An uncontrolled ComboBox stores its own state internally and updates it based on the user input. On the other side, a controlled ComboBox's state is managed by a parent component. The parent component's state passes new values through props to the controlled component which notifies changes through event callbacks."
      title="Controlled vs Uncontrolled"
    >
      <MainSection.Card
        cardSize="lg"
        title="Uncontrolled ComboBox"
        description={`An uncontrolled ComboBox should be used for basic cases where no default value or tags are required. Don't pass \`inputValue\` or \`selectedOptions\` props to keep the component uncontrolled. By passing \`inputValue\` to ComboBox, the component fully manages its internal state: any value different from \`null\` and \`undefined\` makes Combobox controlled.`}
        defaultCode={`
function ComboBoxExample(props) {
  const PRONOUNS = [
    'ey / em',
    'he / him',
    'ne / nem',
    'she / her',
    'they / them',
    've / ver',
    'xe / xem',
    'xie / xem',
    'zie / zem',
  ];

  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: 'value'+index }));

  const [errorMessage, setErrorMessage] = React.useState();

  const handleOnBlur = ({ value }) => {
    if (value !== "" && !PRONOUNS.includes(value)) setErrorMessage('Please, select a valid option');
  };

  const resetErrorMessage = () => (errorMessage ? setErrorMessage() : () => {});

  return (
    <Box width={400}>
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        errorMessage={errorMessage}
        helperText="Choose your pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
        id="uncontrolled"
        label="Pronouns"
        noResultText="No results for your selection"
        onBlur={handleOnBlur}
        onChange={resetErrorMessage}
        onClear={resetErrorMessage}
        options={options}
        placeholder="Add your pronouns"
      />
    </Box>
  );
}
`}
      />
      <MainSection.Card
        cardSize="lg"
        title="Controlled ComboBox"
        description={` A controlled ComboBox is required if a selected value is set, as shown in the first example. In the second example, values are set programatically. Controlled Comboboxes with [tags](#Tags) are also controlled components. A controlled ComboBox requires three value props: \`options\`,  \`inputValue\`,  and \`selectedOptions\`. ComboBox is notified of changes via the \`onChange\`, \`onSelect\`, \`onBlur\`, \`onFocus\`, \`onKeyDown\`, and \`onClear\` props. All values displayed by ComboBox at any time are controlled externally. To clear \`inputValue\`, set the value to an empty string \`inputValue\` = \` "" \`, \`null\`  or \` undefined\` values turn ComboBox into an uncontrolled component.`}
        defaultCode={`
function ComboBoxExample(props) {
  const US_STATES = [
    'AK - Alaska',
    'AL - Alabama',
    'AR - Arkansas',
    'AS - American Samoa',
    'AZ - Arizona',
    'CA - California',
    'CO - Colorado',
    'CT - Connecticut',
    'DC - District of Columbia',
    'DE - Delaware',
    'FL - Florida',
    'GA - Georgia',
    'GU - Guam',
    'HI - Hawaii',
    'IA - Iowa',
    'ID - Idaho',
    'IL - Illinois',
    'IN - Indiana',
    'KS - Kansas',
    'KY - Kentucky',
    'LA - Louisiana',
    'MA - Massachusetts',
    'MD - Maryland',
    'ME - Maine',
    'MI - Michigan',
    'MN - Minnesota',
    'MO - Missouri',
    'MS - Mississippi',
    'MT - Montana',
    'NC - North Carolina',
    'ND - North Dakota',
    'NE - Nebraska',
    'NH - New Hampshire',
    'NJ - New Jersey',
    'NM - New Mexico',
    'NV - Nevada',
    'NY - New York',
    'OH - Ohio',
    'OK - Oklahoma',
    'OR - Oregon',
    'PA - Pennsylvania',
    'PR - Puerto Rico',
    'RI - Rhode Island',
    'SC - South Carolina',
    'SD - South Dakota',
    'TN - Tennessee',
    'TX - Texas',
    'UT - Utah',
    'VA - Virginia',
    'VI - Virgin Islands',
    'VT - Vermont',
    'WA - Washington',
    'WI - Wisconsin',
    'WV - West Virginia',
    'WY - Wyoming',
  ];

  const usStatesOptions = US_STATES.map((pronoun, index) => ({ label: pronoun, value: 'value'+index }));

  const [suggestedOptions, setSuggestedOptions] = React.useState(usStatesOptions);
  const [inputValue, setInputValue] = React.useState(usStatesOptions[5].label);
  const [selected, setSelected] = React.useState(usStatesOptions[5]);

  const handleOnChange = ({ value }) => {
    setSelected();
    if (value) {
      setInputValue(value);
      const filteredOptions = usStatesOptions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setInputValue(value);
      setSuggestedOptions(usStatesOptions);
    }
  };

  const handleSelect = ({ item }) => {
    setInputValue(item.label);
    setSuggestedOptions(usStatesOptions);
    setSelected(item);
  };

  return (
    <Flex direction="column" gap={10} width="50%">
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        label="State"
        id="controlled"
        inputValue={inputValue}
        noResultText="No results for your selection"
        options={suggestedOptions}
        onBlur={() => {
          if (!selected) setInputValue("");
          setSuggestedOptions(usStatesOptions);
        }}
        onClear={() => {
          setInputValue("")
          setSelected();
          setSuggestedOptions(usStatesOptions);
        }}
        selectedOption={selected}
        placeholder="Select a US state"
        onChange={handleOnChange}
        onSelect={handleSelect}
      />
      { selected && selected.label
        ? <Text>Estimated tax to be collected in { (selected && selected.label) } will be calculated at checkout</Text>
        : null
      }
    </Flex>
  );
}`}
      />
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ComboBoxExample(props) {

  const CATEGORIES = { "BEAUTY": [
    'Beauty tips',
    'DIY beauty',
    'Wedding beauty',
    'Vegan beauty products',
    'Beauty photography',
    'Beauty quotes',
    'Beauty illustration',
    'Beauty salon',
    'Beauty blender',
   ].map((pronoun, index) => ({ label: pronoun, value: 'value'+index })),
   "DIY": [
    'DIY Projects',
    'DIY Art',
    'DIY Home decor',
    'DIY Furniture',
    'DIY Gifts',
    'DIY Wall decor',
    'DIY Clothes',
    'DIY Christmas decorations',
    'DIY Christmas gifts',
    'DIY Wall art'].map((pronoun, index) => ({ label: pronoun, value: 'value'+index }))
  };

  const [currentCategory, setCurrentCategory] = React.useState("BEAUTY");

  const [suggestedOptions, setSuggestedOptions] = React.useState(CATEGORIES[currentCategory]);

  const [inputValue, setInputValue] = React.useState("");

  const [selectedOption, setSelectedOption] = React.useState();

  const resetOptions = () => {
    setSuggestedOptions(CATEGORIES[currentCategory]);
  }

  const handleOnChange = ({ value }) => {
    setSelectedOption()
    if (value) {
      setInputValue(value);
      const filteredOptions = CATEGORIES[currentCategory].filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setInputValue(value);
      resetOptions();
    }
  };

  const handleSelect = ({ item }) => {
    setInputValue(item.label);
    setSelectedOption(item);
    resetOptions();
  };

  const handleOnBlur = () => {
    if (!selectedOption) setInputValue("");
    resetOptions();
  }

  const handleOnClear = () => {
    setInputValue("");
    setSelectedOption()
    resetOptions();
  }

  return (
    <Flex direction="column" gap={10}>
      <Button
        onClick={() => {
          const nextCategory = currentCategory === 'BEAUTY' ? 'DIY' : 'BEAUTY';
          setCurrentCategory(nextCategory)
          setSuggestedOptions(CATEGORIES[nextCategory])
          setInputValue("")
        }}
        text={"Change options to " + (currentCategory === "BEAUTY" ? "DIY" : "BEAUTY") + " category"}
        inline
        />
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        id="programaticallySet"
        inputValue={inputValue}
        noResultText="No results for your selection"
        options={suggestedOptions}
        label="Pin category"
        size="lg"
        onBlur={handleOnBlur}
        onClear={handleOnClear}
        placeholder="Select a category"
        onChange={handleOnChange}
        onSelect={handleSelect}
        selectedOption={selectedOption}
      />
    </Flex>
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`
    Include [Tag](/tag) elements in the input using the \`tags\` prop.

    Note that the \`ComboBox\` component doesn't internally manage tags; therefore, it must be a [controlled component](#Controlled-vs-Uncontrolled). A controlled ComboBox requires three value props: \`options\`,  \`inputValue\`,  and \`tags\`.

    To use ComboBox with [tags](/tag), it's recommended to create new tags on enter key presses, to remove them on backspaces when the cursor is in the beginning of the field and to filter out empty tags. These best practices are shown in the following example.`}
      title="Tags"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ComboBoxExample(props) {
  const ref = React.useRef();
  const [selected, setSelected] = React.useState([]);
  const [defaultOption, setDefaultOption] = React.useState('');

  const PRONOUNS = [
    'ey / em',
    'he / him',
    'ne / nem',
    'she / her',
    'they / them',
    've / ver',
    'xe / xem',
    'xie / xem',
    'zie / zem',
  ];

  const options = PRONOUNS.map((pronoun, index) => ({ label: pronoun, value: 'value'+index }));

  const [unselectedOptions, setUnselectedOptions] = React.useState(options.filter((pronoun) => !selected.includes(pronoun.value)));
  const [suggestedOptions, setSuggestedOptions] = React.useState(unselectedOptions);

  const handleOnSelect = ({ item: { label } }) => {
    if (!selected.includes(label) && selected.length < 2) {
      const newSelected = [...selected, label];
      setSelected(newSelected);
      setSuggestedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
      setDefaultOption('');
    }
  };

  const handleOnChange = ({ value }) => {
    setDefaultOption(value);
    if (value) {
      setDefaultOption(value);
      const filteredOptions = unselectedOptions.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase()),
      );
      setSuggestedOptions(filteredOptions);
    } else {
      setSuggestedOptions(unselectedOptions);
    }
  };

  const handleOnBlur = () => setDefaultOption("");

  const handleClear = () => {
    setSelected([]);
    setUnselectedOptions(options);
    setSuggestedOptions(options);
  };

  const handleOnKeyDown = ({
    event: {
      keyCode,
      target: { selectionEnd },
    },
  }) => {
    // Remove tag on backspace if the cursor is at the beginning of the field
    if (keyCode === 8 /* Backspace */ && selectionEnd === 0) {
      const newSelected = [...selected.slice(0, -1)];
      setSelected(newSelected);
      setUnselectedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
      setSuggestedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
    }
  };

  const handleRemoveTag = (removedValue) => {
    const newSelected = selected.filter((tagValue) => tagValue !== removedValue);
    setSelected(newSelected);
    setUnselectedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
    setSuggestedOptions(options.filter((pronoun) => !newSelected.includes(pronoun.label)));
  };

  const renderedTags = selected.map((pronoun) => (
    <Tag
      key={pronoun}
      onRemove={() => handleRemoveTag(pronoun)}
      removeIconAccessibilityLabel={\`Remove \${pronoun} tag\`}
      text={pronoun}
    />
  ));

  return (
    <ComboBox
      accessibilityClearButtonLabel="Clear the current value"
      label="Pronouns"
      id="tags"
      inputValue={defaultOption}
      noResultText="No results for your selection"
      options={suggestedOptions}
      ref={ref}
      helperText="Choose up to 2 sets of pronouns to appear on your profile so others know how to refer to you. You can edit or remove these any time."
      onKeyDown={handleOnKeyDown}
      onChange={handleOnChange}
      onClear={handleClear}
      onBlur={handleOnBlur}
      onSelect={handleOnSelect}
      placeholder={selected.length > 0 ? '' : 'Add your pronouns'}
      tags={renderedTags}
    />
  );
}
`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description={`To control focus or position and anchor components to ComboBox, use \`ref\` as shown in the examples below.`}
      title="Ref"
    >
      <MainSection.Card
        cardSize="lg"
        title="Focus management"
        defaultCode={`
function ComboBoxExample() {
  const ref = React.useRef();

  return (
    <Flex gap={4}>
      <ComboBox
        accessibilityClearButtonLabel="Clear the current values"
        label="Select your favorite shape"
        id="favoriteShape"
        noResultText="No results for your selection"
        options={[{ label:'square', value:'1'}, { label:'circle', value:'2'}]}
        onSelect={() => ref.current.focus()}
        placeholder="Select a shape"
      />
      <ComboBox
        accessibilityClearButtonLabel="Clear the current values"
        label="Select your favorite color"
        id="favoriteColor"
        noResultText="No results for your selection"
        options={[{ label:'red', value:'1'}, { label:'blue', value:'2'}, { label:'green', value:'3'}, { label:'yellow', value:'4'}]}
        placeholder="Select a color"
        ref={ref}
      />
    </Flex>
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection
      description="Display `subtext` under each selection option"
      title="With subtext"
    >
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ComboBoxExample(props) {
  const [item, setItem] = React.useState('');
  const [selected, setSelected] = React.useState(null);

  const options = Array(20).fill(0).map((item, index) => ({
    label: "Label-" + (index + 1),
    value: "Value-" + (index + 1),
    subtext: "Subtext-" + (index + 1),
  }));

  const handleOnChange = ({ value }) => setItem(value);

  const handleSelect = ({ item }) => setSelected(item);

  const label = "Selected Item: " + (selected && selected.value || '');

  return (
    <ComboBox
      accessibilityClearButtonLabel="Clear the current value"
      label="Choose a value"
      id="subtext"
      noResultText="No results for your selection"
      options={options}
      placeholder="Select a value"
      onChange={handleOnChange}
      onSelect={handleSelect}
    />
  );
}`}
      />
    </MainSection.Subsection>
    <MainSection.Subsection title="Error message">
      <MainSection.Card
        cardSize="lg"
        defaultCode={`
function ComboBoxExample(props) {
  return (
    <Box width={400}>
      <ComboBox
        accessibilityClearButtonLabel="Clear the current value"
        errorMessage="Please select a valid category"
        id="error"
        label="Category"
        noResultText="No results for your selection"
        options={[]}
      />
    </Box>
  );
}
`}
      />
    </MainSection.Subsection>
  </MainSection>,
);

card(
  <MainSection name="Related">
    <MainSection.Subsection
      description={`
**[SelectList](/selectlist)**
If users need to select from a short, simple list (without needing sections, subtext details, or the ability to filter the list), use SelectList.

**[Dropdown](/dropdown)**
Dropdown is an element constructed using Popover as its container. Use Dropdown to display a list of actions or options in a Popover.

**[Fieldset](/fieldset)**
Use Fieldset to group related form items.
    `}
    />
  </MainSection>,
);

export default function ComboBoxPage(): Node {
  return <CardPage cards={cards} page="ComboBox" />;
}
