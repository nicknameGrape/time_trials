define(function (require) {
	var modules = [
		{
			"id": "lt11",
			"description_japanese": "世界のあいさつ",
			"description": "Hello, Hello, How are you?",
			"view": require("time_trials_2/modules/greetings")
		},
		{
			"id": "lt12",
			"description_japanese": "ねむいです。",
			"description": "I'm sleepy.",
			"view": require("time_trials_2/modules/how_are_you")
		},
		{
			"id": "lt13",
			"description_japanese": "11 to 21",
			"description": "eleven to twenty-one",
			"view": require("time_trials_2/modules/numbers")
		},
		{
			"id": "lt13",
			"description_japanese": "りんご十個",
			"description": "10 apples",
			"view": require("time_trials_2/modules/count_things")
		},
		{
			"id": "lt14",
			"description_japanese": "カラフル虹",
			"description": "Colors of the Rainbow",
			"view": require("time_trials_2/modules/rainbow")
		},
		{
			"id": "lt14",
			"description_japanese": "りんごは好き。",
			"description": "I like apples.",
			"view": require("time_trials_2/modules/like_dont_like")
		},
		{
			"id": "lt14",
			"description_japanese": "りんごは好きですか？",
			"description": "Do you like apples?",
			"view": require("time_trials_2/modules/do_you_like_yn")
		},
		{
			"id": "lt15",
			"description_japanese": "何が好き？",
			"description": "What do you like?",
			"view": require("time_trials_2/modules/what_like")
		},
		{
			"id": "lt16",
			"description_japanese": "アルファベットおもじ",
			"description": "ABCDEFG",
			"view": require("time_trials_2/modules/ABC_uppercase")
		},
		{
			"id": "lt16",
			"description_japanese": "もじもじことば",
			"description": "Letter, Letter, Letter, Word",
			"view": require("time_trials_2/modules/n_letter_words")
		},
		{
			"id": "lt18",
			"description_japanese": "これなあに？",
			"description": "What's this?",
			"view": require("time_trials_2/modules/silhouette_quiz")
		},
		{
			"id": "lt22",
			"description_japanese": "晴れです",
			"description": "It's sunny.",
			"view": require("time_trials_2/modules/its_sunny")
		},
		{
			"id": "lt22",
			"description_japanese": "晴れです。ドッチボールをしましょう。",
			"description": "It's sunny.  Let's play dodgeball.",
			"view": require("time_trials_2/modules/weather_lets_play")
		},
		{
			"id": "lt23",
			"description_japanese": "曜日",
			"description": "Days",
			"view": require("time_trials_2/modules/days")
		},
		{
			"id": "lt23",
			"description_japanese": "月曜日が好き。ピアノの日。",
			"description": "I like Mondays.  I play piano.",
			"view": require("time_trials_2/modules/do_on_day")
		},
		{
			"id": "lt24",
			"description_japanese": "デジタル時計",
			"description": "Digital Clock",
			"view": require("time_trials_2/modules/digital_clock")
		},
		{
			"id": "lt24",
			"description_japanese": "日常",
			"description": "Daily Routine",
			"view": require("time_trials_2/modules/what_time_is_it")
		},
		{
			"id": "lt25",
			"description_japanese": "えんぴつを持っている。",
			"description": "I have a pencil.",
			"view": require("time_trials_2/modules/i_have")
		},
		{
			"id": "lt25",
			"description_japanese": "えんぴつを持っていますか？",
			"description": "Do you have a pencil?",
			"view": require("time_trials_2/modules/do_you_have")
		},
		{
			"id": "lt26",
			"description_japanese": "アルファベットこもじ",
			"description": "abcdefg",
			"view": require("time_trials_2/modules/abc_lowercase")
		},
		{
			"id": "js52",
			"description_japanese": "一年十二か月",
			"description": "12 months in a year",
			"view": require("time_trials_2/modules/months")
		},
		{
			"id": "js52",
			"description_japanese": "二月二日",
			"description": "February 2nd",
			"view": require("time_trials_2/modules/dates")
		},
		{
			"id": "js53",
			"description_japanese": "月曜日が好き。さんすうの日。",
			"description": "I like Mondays.  I study math.",
			"view": require("time_trials_2/modules/study_on_day")
		},
		{
			"id": "js54",
			"description_japanese": "泳げると？泳げますよ。",
			"description": "Can you swim?  Yes, I can.",
			"view": require("time_trials_2/modules/can_cant")
		},
		{
			"id": "js55",
			"description_japanese": "駅はどこですか？",
			"description": "Where is the station?",
			"view": require("time_trials_2/modules/directions")
		},
		{
			"id": "js55",
			"description_japanese": "中、上、下、そば",
			"description": "in, on, under, by",
			"view": require("time_trials_2/modules/cats_and_boxes")
		},
		{
			"id": "js63",
			"description_japanese": "行きたい、見たい、食べたい。",
			"description": "I want to go to, see, and eat",
			"view": require("time_trials_2/modules/want_to")
		},
		{
			"id": "js67",
			"description_japanese": "ぼくはデザイナー。",
			"description": "I live in China.",
			"view": require("time_trials_2/modules/work_abroad")
		}
	];

	return modules;
});
