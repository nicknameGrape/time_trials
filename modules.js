import world_greetings from "./modules/world_greetings.js"
import world_greetings_2 from "./modules/world_greetings_2.js"
import do_you_like from "./modules/do_you_like.js"
var topics = [
	{
		"topic": "Greetings",
		"modules": [
			{
				"description": "こどもぐらたたき",
				"view": world_greetings
			},
			{
				"description": "こどもぐらたたき2",
				"view": world_greetings_2
			}//,
			//{
			//	"description": "World Greetings",
			//	"view": require("time_trials_2/modules/greetings")
			//},
			//{
			//	"description": "How are you?",
			//	"view": require("time_trials_2/modules/how_are_you")
			//}
		]
	},
	{
		"topic": "Likes and Dislikes",
		"modules": [
//			{
//				"description": "I like apples.  I don't like bananas.",
//				"view": require("time_trials_2/modules/like_dont_like")
//			},
//			{
//				"description": "Do you like apples? Yes, I do. No, I don't.",
//				"view": require("time_trials_2/modules/do_you_like_yn")
//			},
			{
				"description": "Do you like apples? (Q only)",
				"view": do_you_like
			}//,
//			{
//				"description": "What do you like?",
//				"view": require("time_trials_2/modules/what_like")
//			}
		]
	}//,
//	{
//		"topic": "Numbers",
//		"modules": [
//			{
//				"description": "Read Random Numbers",
//				"view": require("time_trials_2/modules/numbers")
//			},
//			{
//				"description": "10 apples",
//				"view": require("time_trials_2/modules/count_things")
//			},
//			{
//				"description": "Old MacDonald",
//				"view": require("time_trials_2/modules/old_macdonald")
//			},
//			{
//				"description": "Old MacDonald (spider)",
//				"view": require("time_trials_2/modules/old_macdonald_spiders")
//			},
//			{
//				"description": "20 Big Green Apples",
//				"view": require("time_trials_2/modules/n_size_color_things")
//			}
//		]
//	},
//	{
//		"topic": "Abilities",
//		"modules": [
//			{
//				"description": "Can you swim?  Yes, I can.",
//				"view": require("time_trials_2/modules/can_cant")
//			},
//			{
//				"description": "Cheetah, can you run fast?",
//				"view": require("time_trials_2/modules/can_animals")
//			}
//		]
//	},
//	{
//		"topic": "Days, Months, Dates, Time, Weather",
//		"modules": [
//			{
//				"description": "It's sunny.",
//				"view": require("time_trials_2/modules/its_sunny")
//			},
//			{
//				"description": "It's sunny.  Let's play dodgeball.",
//				"view": require("time_trials_2/modules/weather_lets_play")
//			},
//			{
//				"description": "SMTWTFS",
//				"view": require("time_trials_2/modules/days")
//			},
//			{
//				"description": "12 months",
//				"view": require("time_trials_2/modules/months")
//			},
//			{
//				"description": "Dates: ex. December 25th",
//				"view": require("time_trials_2/modules/dates")
//			},
//			{
//				"description": "Digital Clock",
//				"view": require("time_trials_2/modules/digital_clock")
//			},
//			{
//				"description": "What time is it?",
//				"view": require("time_trials_2/modules/what_time_is_it")
//			},
//			{
//				"description": "I like Mondays.  I play piano.",
//				"view": require("time_trials_2/modules/do_on_day")
//			},
//			{
//				"description": "I like Mondays.  I study science.",
//				"view": require("time_trials_2/modules/study_on_day")
//			}
//		]
//	},
//	{
//		"topic": "Alphabet",
//		"modules": [
//			{
//				"description": "ABC",
//				"view": require("time_trials_2/modules/ABC_uppercase")
//			},
//			{
//				"description": "abc",
//				"view": require("time_trials_2/modules/abc_lowercase")
//			},
//			{
//				"description": "n-Letter Words",
//				"view": require("time_trials_2/modules/n_letter_words")
//			},
//			{
//				"description": "Timed Typing ABC",
//				"view": require("time_trials_2/modules/timed_typing_uppercase")
//			},
//			{
//				"description": "Timed Typing abc",
//				"view": require("time_trials_2/modules/timed_typing_lowercase")
//			}
//		]
//	},
//	{
//		"topic": "Colors and Shapes",
//		"modules": [
//			{
//				"description": "Rainbow",
//				"view": require("time_trials_2/modules/rainbow")
//			},
//			{
//				"description": "Particolored Shapes",
//				"view": require("time_trials_2/modules/particolored_shapes")
//			},
//			{
//				"description": "n Colored Shapes",
//				"view": require("time_trials_2/modules/n_color_shapes")
//			}
//		]
//	},
//	{
//		"topic": "What's this?",
//		"modules": [
//			{
//				"description": "What's \"apple\" in Japanese?",
//				"view": require("time_trials_2/modules/english_japanese")
//			}
//		]
//	},
//	{
//		"topic": "Directions",
//		"modules": [
//			{
//				"description": "3 Doors",
//				"view": require("time_trials_2/modules/3_doors")
//			},
//			{
//				"description": "Where is the station?",
//				"view": require("time_trials_2/modules/directions")
//			},
//			{
//				"description": "Cats and Boxes",
//				"view": require("time_trials_2/modules/cats_and_boxes")
//			}
//		]
//	},
//	{
//		"topic": "Want to",
//		"modules": [
//			{
//				"description": "Want to go to, see, eat",
//				"view": require("time_trials_2/modules/want_to")
//			},
//			{
//				"description": "I'm a designer.  I live in China.",
//				"view": require("time_trials_2/modules/work_abroad")
//			},
//			{
//				"description": "I'd like spaghetti.",
//				"view": require("time_trials_2/modules/id_like")
//			},
//		]
//	},
//	{
//		"topic": "Pencil Case",
//		"modules": [
//			{
//				"description": "I have a pencil.",
//				"view": require("time_trials_2/modules/i_have")
//			},
//			{
//				"description": "Do you have a pencil?",
//				"view": require("time_trials_2/modules/do_you_have")
//			}
//		]
//	}
];

//return topics;
export default topics
