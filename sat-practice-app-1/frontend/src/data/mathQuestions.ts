// Generated from MathQuestionSat.txt - 2025-07-01T10:11:42.126171
// Total questions: 276

export interface VisualElement {
  type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
  description: string;
  data?: any;
  svg?: string;
}

export interface Question {
  id: string;
  text: string;
  category: 'math' | 'verbal';
  domain: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: string[];
  correctAnswer: string;
  visual?: string;
  visualElement?: VisualElement;
  source: string;
}

// Remove duplicate questions by text, options, and correctAnswer
function dedupeQuestions(questions: Question[]): Question[] {
  const seen = new Set<string>();
  return questions.filter(q => {
    const key = q.text + '|' + q.options.join('|') + '|' + q.correctAnswer;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const mathQuestions: Question[] = dedupeQuestions([
  {
    id: "math_1",
    text: "What system of linear equations is represented by the lines shown?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 8x+4y=32,\u221210x\u22124y=\u221264",
          "B) 8x\u22124y=32,\u221210x+4y=\u221264",
          "C) 4x\u221210y=32,\u22128x+10y=\u221264",
          "D) 4x+10y=32,\u22128x\u221210y=\u221264"
    ],
    correctAnswer: "D",
    visual: "A line graph on an xy-plane with a grid. The x-axis ranges from -2 to 10. The y-axis ranges from -2 to 10. There are two lines graphed. The first line passes through the points (0, 8) and (8, 0). The second line passes through the points (0, 4) and (8, 0).",
    visualElement: {
      type: 'graph',
      description: 'Two-line coordinate graph showing system of linear equations',
      data: {
        xRange: [-2, 10],
        yRange: [-2, 10],
        lines: [
          { points: [[0, 8], [8, 0]], color: '#2563eb' },
          { points: [[0, 4], [8, 0]], color: '#f59e42' }
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_2",
    text: "3x=36y\u221245. One of the two equations in a system of linear equations is given. The system has no solution. Which equation could be the second equation in this system?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) x=4y",
          "B) 31 x=4y",
          "C) x=12y\u221215",
          "D) 31 x=12y\u221215"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_3",
    text: "The graph of the equation ax+ky=6 is a line in the xy-plane, where a and k are constants. If the line contains the points (\u22122,\u22126) and (0,\u22123), what is the value of k?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -2",
          "B) -1",
          "C) 2",
          "D) 3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_4",
    text: "A window repair specialist charges $220 for the first two hours of repair plus an hourly fee for each additional hour. The total cost for 5 hours of repair is $400. Which function f gives the total cost, in dollars, for hours of repair, where x\u22652?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) f(x)=60x+100",
          "B) f(x)=60x+220",
          "C) f(x)=80x",
          "D) f(x)=80x+220"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_5",
    text: "For line h, the table shows three values of x and their corresponding values of y. Line k is the result of translating line h down 5 units in the xy-plane. What is the x-intercept of line k?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) (\u2212326 ,0)",
          "B) (\u221229 ,0)",
          "C) (\u2212311 ,0)",
          "D) (\u2212617 ,0)"
    ],
    correctAnswer: "D",
    visual: "A table with two columns, x and y. The rows contain the following pairs of values: (18, 130), (23, 160), (26, 178).",
    visualElement: {
      type: 'table',
      description: 'Data table with x and y values',
      data: {
        headers: ['x', 'y'],
        rows: [
          ['18', '130'],
          ['23', '160'],
          ['26', '178']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_6",
    text: "A certain apprentice has enrolled in 85 hours of training courses. The equation 10x+15y=85 represents this situation, where x is the number of on-site training courses and y is the number of online training courses this apprentice has enrolled in. How many more hours does each online training course take than each on-site training course?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 10",
          "C) 15",
          "D) 25"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_7",
    text: "The cost of renting a backhoe for up to 10 days is $270 for the first day and $135 for each additional day. Which of the following equations gives the cost y, in dollars, of renting the backhoe for x days, where x is a positive integer and x\u226410?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) y=270x\u2212135",
          "B) y=270x+135",
          "C) y=135x+270",
          "D) y=135x+135"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_8",
    text: "Adam's school is a 20-minute walk or a 5-minute bus ride away from his house. The bus runs once every 30 minutes, and the number of minutes, w, that Adam waits for the bus varies between 0 and 30. Which of the following inequalities gives the values of w for which it would be faster for Adam to walk to school?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) w\u22125<20",
          "B) w\u22125>20",
          "C) w+5<20",
          "D) w+5>20"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_9",
    text: "7x+6y=5,28x+24y=20. For each real number r, which of the following points lies on the graph of each equation in the xy-plane for the given system?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) (r,\u221276r +75 )",
          "B) (r,67r +65 )",
          "C) (4r +5,\u22124r +20)",
          "D) (\u221276r +75 ,r)"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_10",
    text: "In August, a car dealer completed 15 more than 3 times the number of sales the car dealer completed in September. In August and September, the car dealer completed 363 sales. How many sales did the car dealer complete in September?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 87",
          "B) 96",
          "C) 102",
          "D) 121"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_11",
    text: "A factory makes 9-inch, 7-inch, and 4-inch concrete screws. During a certain day, the number of 9-inch concrete screws that the factory makes is 5 times the number n of 7-inch concrete screws, and the number of 4-inch concrete screws is 22. During this day, the factory makes 100 concrete screws total. Which equation represents this situation?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) 9(5n)+7n+4(22)=100",
          "B) 9n+7n+4n=100",
          "C) 5n+22=100",
          "D) 6n+22=100"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_12",
    text: "A laundry service is buying detergent and fabric softener from its supplier. The supplier will deliver no more than 300 pounds in a shipment. Each container of detergent weighs 7.35 pounds, and each container of fabric softener weighs 6.2 pounds. The service wants to buy at least twice as many containers of detergent as containers of fabric softener. Let d represent the number of containers of detergent, and let s represent the number of containers of fabric softener, where d and s are nonnegative integers. Which of the following systems of inequalities best represents this situation?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) 7.35d+6.2s\u2264300,d\u22652s",
          "B) 7.35d+6.2s\u2264300,2d\u2265s",
          "C) 14.7d+6.2s\u2264300,d\u22652s",
          "D) 14.7d+6.2s\u2264300,2d\u2265s"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_13",
    text: "How many solutions does the equation 10(15x\u22129)=\u221215(6\u221210x) have?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) Exactly one",
          "B) Exactly two",
          "C) Infinitely many",
          "D) Zero"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_14",
    text: "y\u2264x+7,y\u2265\u22122x\u22121. Which point (x, y) is a solution to the given system of inequalities in the xy-plane?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) (-14,0)",
          "B) (0,-14)",
          "C) (0,14)",
          "D) (14,0)"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_15",
    text: "53 x+43 y=7. Which table gives three values of x and their corresponding values of y for the given equation?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) Table A",
          "B) Table B",
          "C) Table C",
          "D) Table D"
    ],
    correctAnswer: "D",
    visual: "Four tables are provided as options. Each table has two columns, x and y, and three rows of values. Table A: (1, 113/20), (2, 101/20), (4, 77/20) Table B: (1, 47/5), (2, 44/5), (4, 38/5) Table C: (1, 148/15), (2, 136/15), (4, 112/15) Table D: (1, 128/15), (2, 116/15), (4, 92/15)",
    visualElement: {
      type: 'table',
      description: 'Multiple choice tables',
      data: {
        multipleChoice: true,
        tables: [
          {
            label: 'Table A',
            headers: ['x', 'y'],
            rows: [
              ['1', '113/20'],
              ['2', '101/20'],
              ['4', '77/20']
            ]
          },
          {
            label: 'Table B',
            headers: ['x', 'y'],
            rows: [
              ['1', '47/5'],
              ['2', '44/5'],
              ['4', '38/5']
            ]
          },
          {
            label: 'Table C',
            headers: ['x', 'y'],
            rows: [
              ['1', '148/15'],
              ['2', '136/15'],
              ['4', '112/15']
            ]
          },
          {
            label: 'Table D',
            headers: ['x', 'y'],
            rows: [
              ['1', '128/15'],
              ['2', '116/15'],
              ['4', '92/15']
            ]
          }
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_16",
    text: "3(kx+13)=1748 x+36. In the given equation, k is a constant. The equation has no solution. What is the value of k?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) 16/17",
          "B) 1",
          "C) 3",
          "D) 12"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_17",
    text: "For the linear function f, the table shows three values of x and their corresponding values of f(x). If h(x)=f(x)\u221213, which equation defines h?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) h(x)=5x\u22124",
          "B) h(x)=5x+7",
          "C) h(x)=5x+9",
          "D) h(x)=5x+20"
    ],
    correctAnswer: "B",
    visual: "A table with two columns, x and f(x). The rows contain the following pairs of values: (-4, 0), (-19/5, 1), (-18/5, 2).",
    visualElement: {
      type: 'table',
      description: 'Function values table',
      data: {
        headers: ['x', 'f(x)'],
        rows: [
          ['-4', '0'],
          ['-19/5', '1'],
          ['-18/5', '2']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_18",
    text: "The functions f and g are defined as f(x)=41 x\u22129 and g(x)=43 x+21. If the function h is defined as h(x)=f(x)+g(x), what is the x-coordinate of the x-intercept of the graph of y=h(x) in the xy-plane?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) -12",
          "B) -9",
          "C) 9",
          "D) 12"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_19",
    text: "A number x is at most 2 less than 3 times the value of y. If the value of y is -4, what is the greatest possible value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) -14",
          "B) -10",
          "C) -6",
          "D) -2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_20",
    text: "\u2212x+y=\u22123.5,x+3y=9.5. If (x, y) satisfies the system of equations above, what is the value of y?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 1.5",
          "B) 3",
          "C) 3.25",
          "D) 6.5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_21",
    text: "Hector used a tool called an auger to remove corn from a storage bin at a constant rate. The bin contained 24,000 bushels of corn when Hector began to use the auger. After 5 hours of using the auger, 19,350 bushels of corn remained in the bin. If the auger continues to remove corn at this rate, what is the total number of hours Hector will have been using the auger when 12,840 bushels of corn remain in the bin?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 7",
          "C) 8",
          "D) 12"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_22",
    text: "23 y\u221241 x=32 \u221223 y,21 x+23 =py+29 . In the given system of equations, p is a constant. If the system has no solution, what is the value of p?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -6",
          "B) -3",
          "C) 3",
          "D) 6"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_23",
    text: "An economist modeled the demand Q for a certain product as a linear function of the selling price P. The demand was 20,000 units when the selling price was $40 per unit, and the demand was 15,000 units when the selling price was $60 per unit. Based on the model, what is the demand, in units, when the selling price is $55 per unit?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) 16,250",
          "B) 16,500",
          "C) 16,750",
          "D) 17,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_24",
    text: "Line p is defined by 4y+8x=6. Line r is perpendicular to line p in the xy-plane. What is the slope of line r?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -2",
          "B) -1/2",
          "C) 1/2",
          "D) 2"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_25",
    text: "Alan drives an average of 100 miles each week. His car can travel an average of 25 miles per gallon of gasoline. Alan would like to reduce his weekly expenditure on gasoline by $5. Assuming gasoline costs $4 per gallon, which equation can Alan use to determine how many fewer average miles, m, he should drive each week?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) 425 m=95",
          "B) 425 m=5",
          "C) 254 m=95",
          "D) 254 m=5"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_26",
    text: "A local transit company sells a monthly pass for $95 that allows an unlimited number of trips of any length. Tickets for individual trips cost $1.50, $2.50, or $3.50, depending on the length of the trip. What is the minimum number of trips per month for which a monthly pass could cost less than purchasing individual tickets for trips?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) 27",
          "B) 28",
          "C) 38",
          "D) 64"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_27",
    text: "In the xy-plane, line k intersects the y-axis at the point (0,-6) and passes through the point (2, 2). If the point (20, w) lies on line k, what is the value of w?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 74",
          "B) 76",
          "C) 80",
          "D) 82"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_28",
    text: "4x\u22126y=10y+2,ty=21 +2x. In the given system of equations, t is a constant. If the system has no solution, what is the value of t?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -8",
          "B) -4",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_29",
    text: "F(x)=59 (x\u2212273.15)+32. The function F gives the temperature, in degrees Fahrenheit, that corresponds to a temperature of x kelvins. If a temperature increased by 9.10 kelvins, by how much did the temperature increase, in degrees Fahrenheit?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) 16.38",
          "B) 48.38",
          "C) 475.29",
          "D) 507.29"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_30",
    text: "During a month, Morgan ran r miles at 5 miles per hour and biked b miles at 10 miles per hour. She ran and biked a total of 200 miles that month, and she biked for twice as many hours as she ran. What is the total number of miles that Morgan biked during the month?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 80",
          "B) 100",
          "C) 120",
          "D) 160"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_31",
    text: "According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from September 1, 2014, to December 1, 2014, is modeled by the function F defined below, where F(x) is the average price per gallon x months after September 1. F(x)=2.74\u22120.19(x\u22123). The constant 2.74 in this function estimates which of the following?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) The average monthly decrease in the price per gallon",
          "B) The difference in the average price per gallon from September 1, 2014, to December 1, 2014",
          "C) The average price per gallon on September 1, 2014",
          "D) The average price per gallon on December 1, 2014"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_32",
    text: "In the xy-plane, line l passes through the point (0, 0) and is parallel to the line represented by the equation y=8x+2. If line l also passes through the point (3, d), what is the value of d?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 24",
          "B) 26",
          "C) 28",
          "D) 30"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_33",
    text: "21 x+31 y=61 ,ax+y=c. In the system of equations below, a and c are constants. If the system of equations has an infinite number of solutions (x,y) what is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) \u221221",
          "B) 0",
          "C) 21",
          "D) 23"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_34",
    text: "The graph of y=f(x)+14 is shown. Which equation defines function f?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) f(x)=\u221241 x\u221212",
          "B) f(x)=\u221241 x+16",
          "C) f(x)=\u221241 x+2",
          "D) f(x)=\u221241 x\u221214"
    ],
    correctAnswer: "A",
    visual: "A line graph on an xy-plane with a grid. The x-axis ranges from -10 to 10. The y-axis ranges from -10 to 10. A single line is graphed, passing through the points (0, 2) and (8, 0).",
    visualElement: {
      type: 'graph',
      description: 'Single line graph on coordinate plane',
      data: {
        xRange: [-10, 10],
        yRange: [-10, 10],
        lines: [
          { points: [[0, 2], [8, 0]], color: '#2563eb' }
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_35",
    text: "y>2x\u22121,2x>5. Which of the following consists of the y-coordinates of all the points that satisfy the system of inequalities above?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) y>6",
          "B) y>4",
          "C) y>25",
          "D) y>23"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_36",
    text: "Ken is working this summer as part of a crew on a farm. He earned $8 per hour for the first 10 hours he worked this week. Because of his performance, his crew leader raised his salary to $10 per hour for the rest of the week. Ken saves 90% of his earnings from each week. What is the least number of hours he must work the rest of the week to save at least $270 for the week?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) 38",
          "B) 33",
          "C) 22",
          "D) 16"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_37",
    text: "The table above shows some values of x and their corresponding values f(x) for the linear function f. What is the x-intercept of the graph of y=f(x) in the xy-plane?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) (-3,0)",
          "B) (-4,0)",
          "C) (-9,0)",
          "D) (-12,0)"
    ],
    correctAnswer: "B",
    visual: "A table with two columns, x and f(x). The rows contain the following pairs of values: (-11, 21), (-10, 18), (-9, 15), (-8, 12).",
    visualElement: {
      type: 'table',
      description: 'Linear function values table',
      data: {
        headers: ['x', 'f(x)'],
        rows: [
          ['-11', '21'],
          ['-10', '18'],
          ['-9', '15'],
          ['-8', '12']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_38",
    text: "Store A sells raspberries for $5.50 per pint and blackberries for $3.00 per pint. Store B sells raspberries for $6.50 per pint and blackberries for $8.00 per pint. A certain purchase of raspberries and blackberries would cost $37.00 at Store A or $66.00 at Store B. How many pints of blackberries are in this purchase?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 5",
          "C) 8",
          "D) 12"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_39",
    text: "5G+45R=380. At a school fair, students can win colored tokens that are worth a different number of points depending on the color. One student won G green tokens and R red tokens worth a total of 380 points. The given equation represents this situation. How many more points is a red token worth than a green token?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 9",
          "C) 40",
          "D) 76"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_40",
    text: "y=2x+1,y=ax\u22128. In the system of equations above, a is a constant. If the system of equations has no solution, what is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) \u221221",
          "B) 0",
          "C) 1",
          "D) 2"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_41",
    text: "A shipping service restricts the dimensions of the boxes it will ship for a certain type of service. The restriction states that for boxes shaped like rectangular prisms, the sum of the perimeter of the base of the box and the height of the box cannot exceed 130 inches. The perimeter of the base is determined using the width and length of the box. If a box has a height of 60 inches and its length is 2.5 times the width, which inequality shows the allowable width x, in inches, of the box?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) 0<x\u226410",
          "B) 0<x\u22641132",
          "C) 0<x\u22641721",
          "D) 0<x<20"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_42",
    text: "The table above shows the coordinates of three points on a line in the xy-plane, where k and n are constants. If the slope of the line is 2, what is the value of k+n?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 25",
          "C) 30",
          "D) 32"
    ],
    correctAnswer: "C",
    visual: "A table with two columns, x and y. The rows contain the following pairs of values: (3, 7), (k, 11), (12, n).",
    visualElement: {
      type: 'table',
      description: 'Coordinate table with variables',
      data: {
        headers: ['x', 'y'],
        rows: [
          ['3', '7'],
          ['k', '11'],
          ['12', 'n']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_43",
    text: "If 3x+6 =13x+6 , the value of x+6 is between which of the following pairs of values?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) -7 and -3",
          "B) -2 and 2",
          "C) 2 and 7",
          "D) 8 and 13"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_44",
    text: "y=21 x+8,y=cx+10. In the system of equations above, c is a constant. If the system has no solution, what is the value of c?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -1/2",
          "B) 0",
          "C) 1/2",
          "D) 1"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_45",
    text: "5x+14y=45,10x+7y=27. The solution to the given system of equations is (x, y). What is the value of xy?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 3/5",
          "B) 3",
          "C) 9/5",
          "D) 15"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_46",
    text: "I=RV . The formula above is Ohm's law for an electric circuit with current I, in amperes, potential difference V, in volts, and resistance R, in ohms. A circuit has a resistance of 500 ohms, and its potential difference will be generated by n six-volt batteries that produce a total potential difference of 6n volts. If the circuit is to have a current of no more than 0.25 ampere, what is the greatest number, n, of six-volt batteries that can be used?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
          "A) 20",
          "B) 21",
          "C) 125",
          "D) 500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_47",
    text: "F(x)=59 (x\u2212273.15)+32. The function F gives the temperature, in degrees Fahrenheit, that corresponds to a temperature of x kelvins. If a temperature increased by 2.10 kelvins, by how much did the temperature increase, in degrees Fahrenheit?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) 3.78",
          "B) 35.78",
          "C) 487.89",
          "D) 519.89"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_48",
    text: "Line f in the xy-plane is perpendicular to the line with equation x=2. What is the slope of line f?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) \u221221",
          "C) -2",
          "D) The slope of line f is undefined."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_49",
    text: "The Townsend Realty Group invested in the five different properties listed in the table above. The table shows the amount, in dollars, the company paid for each property and the corresponding monthly rental price, in dollars, the company charges for the property at each of the five locations. Townsend Realty purchased the Glenview Street property and received a 40% discount off the original price along with an additional 20% off the discounted price for purchasing the property in cash. Which of the following best approximates the original price, in dollars, of the Glenview Street property?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) $350,000",
          "B) $291,700",
          "C) $233,300",
          "D) $175,000"
    ],
    correctAnswer: "B",
    visual: "A table with three columns: Property address, Purchase price (dollars), and Monthly rental price (dollars). The properties are Clearwater Lane (128,000, 950), Driftwood Drive (176,000, 1,310), Edgemont Street (70,000, 515), Glenview Street (140,000, 1,040), and Hamilton Circle (450,000, 3,365).",
    visualElement: {
      type: 'table',
      description: 'Property investment table',
      data: {
        headers: ['Property Address', 'Purchase Price ($)', 'Monthly Rental Price ($)'],
        rows: [
          ['Clearwater Lane', '128,000', '950'],
          ['Driftwood Drive', '176,000', '1,310'],
          ['Edgemont Street', '70,000', '515'],
          ['Glenview Street', '140,000', '1,040'],
          ['Hamilton Circle', '450,000', '3,365']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_50",
    text: "One gallon of paint will cover 220 square feet of a surface. A room has a total wall area of w square feet. Which equation represents the total amount of paint P, in gallons, needed to paint the walls of the room twice?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
          "A) P=110w",
          "B) P=440w",
          "C) P=220w",
          "D) P=220w"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_51",
    text: "h(x)=2(x\u22124)2\u221232. The quadratic function h is defined as shown. In the xy-plane, the graph of y=h(x) intersects the x-axis at the points (0,0) and (t,0), where t is a constant. What is the value of t?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 1",
          "B) 2",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_52",
    text: "2\u22234\u2212x\u2223+3\u22234\u2212x\u2223=25. What is the positive solution to the given equation?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -1",
          "B) 5",
          "C) 9",
          "D) 25"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_53",
    text: "In the xy-plane, a line with equation 2y=4.5 intersects a parabola at exactly one point. If the parabola has equation y=\u22124x2+bx, where b is a positive constant, what is the value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 2.25",
          "B) 4.5",
          "C) 6",
          "D) 9"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_54",
    text: "f(x)=9,000(0.66)x. The given function f models the number of advertisements a company sent to its clients each year, where x represents the number of years since 1997, and 0\u2264x\u22645. If y=f(x) is graphed in the xy-plane, which of the following is the best interpretation of the y-intercept of the graph in this context?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) The minimum estimated number of advertisements the company sent to its clients during the 5 years was 1,708.",
          "B) The minimum estimated number of advertisements the company sent to its clients during the 5 years was 9,000.",
          "C) The estimated number of advertisements the company sent to its clients in 1997 was 1,708.",
          "D) The estimated number of advertisements the company sent to its clients in 1997 was 9,000."
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_55",
    text: "x\u2212y=1,x+y=x2\u22123. Which ordered pair is a solution to the system of equations above?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) (1+3 ,3 )",
          "B) (3 ,\u22123 )",
          "C) (1+5 ,5 )",
          "D) (5 ,\u22121+5 )"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_56",
    text: "(ax+3)(5x2\u2212bx+4)=20x3\u22129x2\u22122x+12. The equation above is true for all x, where a and b are constants. What is the value of ab?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 18",
          "B) 20",
          "C) 24",
          "D) 40"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_57",
    text: "Which of the following expressions is(are) a factor of 3x2+20x\u221263? I. x\u22129 II. 3x\u22127",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) I only",
          "B) II only",
          "C) I and II",
          "D) Neither I nor II"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_58",
    text: "If 3x4 x5 =xba for all positive values of x, what is the value of ba ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 5/12",
          "B) 7/6",
          "C) 4/3",
          "D) 5/2"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_59",
    text: "Function f is defined by f(x)=\u2212ax+b, where a and b are constants. In the xy-plane, the graph of y=f(x)\u221212 has a y-intercept at (0,\u2212775 ). The product of a and b is 7320 . What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 16/7",
          "C) 20",
          "D) 320/7"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_60",
    text: "x2+10x+251 =4. If x is a solution to the given equation, which of the following is a possible value of x+5?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 21",
          "B) 25",
          "C) 29",
          "D) 211"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_61",
    text: "During a 5-second time interval, the average acceleration a, in meters per second squared, of an object with an initial velocity of 12 meters per second is defined by the equation a=5vf \u221212 where vf is the final velocity of the object in meters per second. If the equation is rewritten in the form vf =xa+y, where x and y are constants, what is the value of x?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 17",
          "D) 60"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_62",
    text: "f(x)=\u2212500x2+25,000x. The revenue f(x), in dollars, that a company receives from sales of a product is given by the function f above, where x is the unit price, in dollars, of the product. The graph of y=f(x) in the xy-plane intersects the x-axis at 0 and a. What does a represent?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) The revenue, in dollars, when the unit price of the product is $0",
          "B) The unit price, in dollars, of the product that will result in maximum revenue",
          "C) The unit price, in dollars, of the product that will result in a revenue of $0",
          "D) The maximum revenue, in dollars, that the company can make"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_63",
    text: "x\u221222 +x+53 =(x\u22122)(x+5)rx+t . The equation above is true for all x>2 where r and t are positive constants. What is the value of rt?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) -20",
          "B) 15",
          "C) 20",
          "D) 60"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_64",
    text: "A culture of bacteria is growing at an exponential rate, as shown in the table above. At this rate, on which day would the number of bacteria per milliliter reach 5.12\u00d7108?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) Day 5",
          "B) Day 9",
          "C) Day 11",
          "D) Day 12"
    ],
    correctAnswer: "D",
    visual: "A table titled \"Growth of a Culture of Bacteria\" with two columns: Day, and Number of bacteria per milliliter at end of day. The rows are: Day 1, 2.5x10^5; Day 2, 5.0x10^5; Day 3, 1.0x10^6.",
    visualElement: {
      type: 'table',
      description: 'Bacterial growth data table',
      data: {
        headers: ['Day', 'Number of bacteria per milliliter'],
        rows: [
          ['1', '2.5×10⁵'],
          ['2', '5.0×10⁵'],
          ['3', '1.0×10⁶']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_65",
    text: "570n (670n )2. For what value of x is the given expression equivalent to (70n)30x where n>1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 4/225",
          "B) 8/15",
          "C) 1/5",
          "D) 1/3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_66",
    text: "2x2\u22122=2x+3. Which of the following is a solution to the equation above?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 1\u221211",
          "C) 21 +11",
          "D) 21+11"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_67",
    text: "f(x)=ax2+4x+c. In the given quadratic function, a and c are constants. The graph of y=f(x) in the xy-plane is a parabola that opens upward and has a vertex at the point (h, k), where h and k are constants. If k<0 and f(\u22129)=f(3), which of the following must be true? I. c<0 II. a\u22651",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) I only",
          "B) II only",
          "C) I and II",
          "D) Neither I nor II"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_68",
    text: "In the xy-plane, a line with equation y=c for some constant c intersects a parabola at exactly one point. If the parabola has equation y=\u2212x2+5x, what is the value of c?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 20.25",
          "B) 81/4",
          "C) 6.25",
          "D) 25/4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_69",
    text: "The expression (2x2+3x\u22127)(x\u22122) is equivalent to the expression ax3+bx2+cx+d, where a, b, c, and d are constants. What is the value of a+b+c+d?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) -14",
          "C) -18",
          "D) -419"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_70",
    text: "Which expression is equivalent to x+22x2\u22124 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2x+2",
          "B) 2x\u22122",
          "C) 2x\u22124+x+24",
          "D) 2x\u22124+x+24"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_71",
    text: "In the expression x\u2212bx2\u2212c , b and c are positive integers. If the expression is equivalent to x+b and x\ue020=b, which of the following could be the value of c?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 6",
          "C) 8",
          "D) 10"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_72",
    text: "The function f is defined by f(x)=(x\u22126)(x+12). For what value of x does f(x) reach its minimum?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -12",
          "B) -6",
          "C) -3",
          "D) 3"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_73",
    text: "2x2+4x=t. In the equation above, t is a constant. If the equation has no real solutions, which of the following could be the value of t?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -2",
          "C) 1",
          "D) 3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_74",
    text: "A model estimates that at the end of each year from 2015 to 2020, the number of squirrels in a population was 15% more than the number of squirrels in the population at the end of the previous year. The model estimates that at the end of 2016, there were 180 squirrels in the population. Which of the following equations represents this model, where S is the estimated number of squirrels in the population t years after the end of 2015 and 0\u2264t\u22645?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) S=180(1.15)t\u22121",
          "B) S=156.5(1.15)t",
          "C) S=180(0.85)t",
          "D) S=156.5(0.85)t\u22121"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_75",
    text: "The expression 31 x2\u22122 can be rewritten as 31 (x\u2212k)(x+k), where k is a positive constant. What is the value of k?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 6",
          "C) 2",
          "D) 6"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_76",
    text: "y=x2\u22124x\u22121,y+3=x. If (x1 ,y1 ) and (x2 ,y2 ) are the two solutions to the system of equations above, what is the value of y1 +y2 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -1",
          "C) 1",
          "D) 4"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_77",
    text: "If u\u2212t=t\u221222 , what is t in terms of u?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) u+2",
          "B) u\u22122",
          "C) 2u+u2+16",
          "D) 2u\u00b1u2\u221216"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_78",
    text: "y=x2\u22126x+10,y\u2212x=k. The graphs of the equations in the given system of equations intersect at the point (x,y) in the xy-plane. What is a possible value of x?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 3\u2212k\u22121",
          "B) 3+k+1",
          "C) 3\u2212k\u221210",
          "D) 3+k+10"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_79",
    text: "The table above gives selected values of a polynomial function p. Based on the values in the table, which of the following must be a factor of p?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) x\u22125",
          "B) x\u22122",
          "C) x+2",
          "D) x2\u22124"
    ],
    correctAnswer: "D",
    visual: "A table with two columns, x and p(x). The rows contain the following pairs of values: (-2, 0), (-1, 4), (0, 5), (1, 3), (2, 0).",
    visualElement: {
      type: 'table',
      description: 'Polynomial function values table',
      data: {
        headers: ['x', 'p(x)'],
        rows: [
          ['-2', '0'],
          ['-1', '4'],
          ['0', '5'],
          ['1', '3'],
          ['2', '0']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_80",
    text: "When the quadratic function f(x)=ax2+bx+c is graphed in the xy-plane, where y=f(x), its vertex is (\u22123,6). One of the x-intercepts of this graph is \u221217/4. What is the other x-intercept of the graph?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) \u221219/4",
          "B) \u22127/4",
          "C) 3",
          "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_81",
    text: "The function f is defined by f(x)=(x+4)(x\u22128). The graph of f in the xy-plane is a parabola. Which of the following intervals contains the x-coordinate of the vertex of the graph of f?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) \u22125<x<\u22123",
          "B) 1<x<3",
          "C) 3<x<5",
          "D) 5<x<7"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_82",
    text: "A landscaper is designing a rectangular garden. The length of the garden is to be 5 feet longer than the width. If the area of the garden will be 104 square feet, what will be the length, in feet, of the garden?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 13",
          "C) 18",
          "D) 26"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_83",
    text: "In the xy-plane, the graph of y=x2+x+10 intersects line p at (1,a) and (5,b), where a and b are constants. What is the slope of line p?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 6",
          "B) 7",
          "C) 10",
          "D) 12"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_84",
    text: "For the function f, f(0)=86, and for each increase in x by 1, the value of f(x) decreases by 80%. What is the value of f(2)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 3.44",
          "B) 17.2",
          "C) 68.8",
          "D) 86"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_85",
    text: "M=1,800(1.02)t. The equation above models the number of members, M, of a gym t years after the gym opens. Of the following, which equation models the number of members of the gym q quarter years after the gym opens?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) M=1,800(1.005)q",
          "B) M=1,800(1.02)q/4",
          "C) M=1,800(1.08)q",
          "D) M=1,800(1.02)4q"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_86",
    text: "D=T\u22120.006(H\u2212100). The formula above can be used to approximate the dew point D, in degrees Fahrenheit, given the temperature T, in degrees Fahrenheit, and the relative humidity of H percent, where H\u226550. Which of the following expresses the relative humidity in terms of the temperature and the dew point?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) H=100\u22120.006T\u2212D",
          "B) H=100+0.006T\u2212D",
          "C) H=100\u22120.006D\u2212T",
          "D) H=0.006D\u2212T+100"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_87",
    text: "Which of the following is equivalent to (x2+x+3)(x\u22121)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x3\u22123",
          "B) x3+2x\u22123",
          "C) x3+2x2+2x\u22123",
          "D) x3+2x+3"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_88",
    text: "The surface area of a cube is 6a2, where a is a positive constant. Which of the following gives the perimeter of one face of the cube?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) a",
          "B) 4a",
          "C) 6a",
          "D) a2"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_89",
    text: "In the xy-plane, the graph of y=x2\u22125x intersects the graph of y=x at the points (0,0) and (a,a). What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 5",
          "C) 6",
          "D) 7"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_90",
    text: "One of the factors of 2x3+14x2+24x is x+b, where b is a positive constant. What is the smallest possible value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 3",
          "C) 4",
          "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_91",
    text: "The table shows three values of x and their corresponding values of y=f(x), where f is a quadratic function. What is the y-coordinate of the y-intercept of the graph of y=f(x) in the xy-plane?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -21",
          "B) -19",
          "C) -12",
          "D) -10"
    ],
    correctAnswer: "B",
    visual: "A table with two columns, x and y. The rows contain the following pairs of values: (8, 2), (12, 2), (10, -2).",
    visualElement: {
      type: 'table',
      description: 'Quadratic function values table',
      data: {
        headers: ['x', 'y'],
        rows: [
          ['8', '2'],
          ['12', '2'],
          ['10', '-2']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_92",
    text: "A quadratic function models the height, in feet, of an object above the ground in terms of the time, in seconds, after the object is launched off an elevated surface. The model indicates the object has an initial height of 180 feet above the ground and reaches its maximum height of 244 feet above the ground 2 seconds after being launched. Based on the model, what is the height, in feet, of the object above the ground 4 seconds after being launched?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 116",
          "B) 148",
          "C) 180",
          "D) 244"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_93",
    text: "The function f is defined by f(x)=a(x\u2212h)2+k, where a, h, and k are positive constants. The graph of y=f(x) in the xy-plane passes through the points (h, 5) and (2h, 9). What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 4/h^2",
          "B) 5",
          "C) 9",
          "D) h^2/4"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_94",
    text: "x\u22123x2\u2212x\u22126 =x+a. The equation is true for all x>3, where a is an integer. What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) -2",
          "B) -1",
          "C) 0",
          "D) 2"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_95",
    text: "The expression 5x2\u221215x+10 can be written in the form a(x\u2212b)(x\u2212c), where a, b, and c are constants. What is the value of a+b+c?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 9",
          "C) 10",
          "D) 12"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_96",
    text: "If a=c+d and x=a2\u2212c2\u22122cd\u2212d2, which of the following is equivalent to the expression x?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x\u2212a2",
          "B) x2\u2212a2",
          "C) (x+a)(x\u2212a)",
          "D) x\u2212a"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_97",
    text: "A rectangular poster has an area of 432 square inches. A copy of the poster is made in which the length and width of the original poster are each increased by 50%. What is the area of the copy, in square inches?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 216",
          "B) 648",
          "C) 972",
          "D) 1296"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_98",
    text: "A right circular cone has a volume of 31 \u03c0 cubic feet and a height of 9 feet. What is the radius, in feet, of the base of the cone?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 31",
          "B) 3 1",
          "C) 1",
          "D) 3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_99",
    text: "In the figure, parallel lines l and m are intersected by lines t and u. If x=65 and y=36, what is the value of z?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficulty: "hard",
    options: [
          "A) 79",
          "B) 90",
          "C) 101",
          "D) 115"
    ],
    correctAnswer: "A",
    visual: "A diagram showing two parallel horizontal lines, l and m. Two transversals, t and u, intersect the parallel lines and each other. The angle labeled x is an interior angle formed by lines l and t. The angle labeled y is an interior angle formed by lines m and u. The angle labeled z is in the triangle formed by the intersection of l, t, and u.",
    visualElement: {
      type: 'diagram',
      description: 'Parallel lines with transversals diagram',
      svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#333" stroke-width="2" fill="none"><line x1="20" y1="60" x2="280" y2="60" stroke="#2563eb"/><line x1="20" y1="140" x2="280" y2="140" stroke="#2563eb"/><line x1="80" y1="20" x2="140" y2="180" stroke="#f59e0b"/><line x1="160" y1="20" x2="220" y2="180" stroke="#10b981"/></g><g fill="#333" font-size="14" font-family="Arial"><text x="25" y="55">l</text><text x="25" y="135">m</text><text x="75" y="15">t</text><text x="155" y="15">u</text><text x="95" y="45">x</text><text x="175" y="155">y</text><text x="140" y="85">z</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_100",
    text: "In the figure above, RT\u2245TU. What is the value of x?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficulty: "hard",
    options: [
          "A) 26",
          "B) 52",
          "C) 78",
          "D) 104"
    ],
    correctAnswer: "C",
    visual: "A triangle RST with a point U on side RS. A line segment connects T and U. Angle R is 26 degrees. Angle TSU is 52 degrees. Angle RTU is x degrees.",
    visualElement: {
      type: 'diagram',
      description: 'Triangle with internal point and angles',
      svg: '<svg width="280" height="200" viewBox="0 0 280 200"><g stroke="#333" stroke-width="2" fill="none"><polygon points="40,160 240,160 140,40" stroke="#2563eb"/><line x1="120,150" x2="140,40" stroke="#f59e0b"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="35" y="175">R</text><text x="245" y="175">S</text><text x="135" y="30">T</text><text x="115" y="175">U</text><text x="50" y="145">26°</text><text x="210" y="145">52°</text><text x="125" y="65">x°</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_101",
    text: "In the xy-plane, a line with equation y=c for some constant c intersects a parabola at exactly one point. If the parabola has equation y=\u2212x2+5x, what is the value of c?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 6.25",
          "B) 6.5",
          "C) 7.25",
          "D) 7.5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_102",
    text: "The expression (2x2+3x\u22127)(x\u22122) is equivalent to the expression ax3+bx2+cx+d, where a, b, c, and d are constants. What is the value of a+b+c+d?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) -14",
          "C) -18",
          "D) -419"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_103",
    text: "Which expression is equivalent to x+22x2\u22124 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2x+2",
          "B) 2x\u22122",
          "C) 2x\u22124+x+24",
          "D) 2x\u22124+x+24"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_104",
    text: "In the expression x\u2212bx2\u2212c , b and c are positive integers. If the expression is equivalent to x+b and x\ue020=b, which of the following could be the value of c?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 6",
          "C) 8",
          "D) 10"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_105",
    text: "The function f is defined by f(x)=(x\u22126)(x+12). For what value of x does f(x) reach its minimum?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -12",
          "B) -6",
          "C) -3",
          "D) 3"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_106",
    text: "2x2+4x=t. In the equation above, t is a constant. If the equation has no real solutions, which of the following could be the value of t?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -2",
          "C) 1",
          "D) 3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_107",
    text: "A model estimates that at the end of each year from 2015 to 2020, the number of squirrels in a population was 15% more than the number of squirrels in the population at the end of the previous year. The model estimates that at the end of 2016, there were 180 squirrels in the population. Which of the following equations represents this model, where S is the estimated number of squirrels in the population t years after the end of 2015 and 0\u2264t\u22645?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) S=180(1.15)t\u22121",
          "B) S=156.5(1.15)t",
          "C) S=180(0.85)t",
          "D) S=156.5(0.85)t\u22121"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_108",
    text: "The expression 31 x2\u22122 can be rewritten as 31 (x\u2212k)(x+k), where k is a positive constant. What is the value of k?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 6",
          "C) 2",
          "D) 6"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_109",
    text: "y=x2\u22124x\u22121,y+3=x. If (x1 ,y1 ) and (x2 ,y2 ) are the two solutions to the system of equations above, what is the value of y1 +y2 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -1",
          "C) 1",
          "D) 4"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_110",
    text: "In the expression 6x2+(3p\u221216p\u221264)x+24, p is a constant. This expression is equivalent to the expression 6x2\u2212155x+24. What is the value of p?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) 7",
          "C) 13",
          "D) 155"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_111",
    text: "What is the solution set of the equation 2x+6 +4=x+3?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) {\u22121}",
          "B) {5}",
          "C) {\u22121,5}",
          "D) {0,\u22121,5}"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_112",
    text: "The graph of the function f, defined by f(x)=\u221221 (x\u22124)2+10, is shown in the xy-plane above. If the function g (not shown) is defined by g(x)=\u2212x+10, what is one possible value of a such that f(a)=g(a)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 1",
          "B) 2",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "B",
    visual: "A parabola opening downwards is graphed on an xy-plane. The vertex is at (4, 10). The x-intercepts are approximately at -0.5 and 8.5. The y-intercept is at (0, 2).",
    visualElement: {
      type: 'graph',
      description: 'Downward-opening parabola with vertex and intercepts',
      svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" stroke="#e5e7eb" stroke-width="1"/></pattern></defs><rect width="300" height="250" fill="url(#grid)"/></g><g stroke="#333" stroke-width="2" fill="none"><line x1="0" y1="200" x2="300" y2="200"/><line x1="150" y1="0" x2="150" y2="250"/></g><g stroke="#2563eb" stroke-width="3" fill="none"><path d="M 135 200 Q 150 50 165 200" transform="scale(2.2,1) translate(-15,0)"/></g><g fill="#ef4444" r="4"><circle cx="80" cy="50" r="4"/><circle cx="220" cy="50" r="4"/><circle cx="150" cy="180" r="4"/><circle cx="30" cy="200" r="4"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="75" y="40">(4,10)</text><text x="10" y="215">(-0.5,0)</text><text x="225" y="215">(8.5,0)</text><text x="25" y="190">(0,2)</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_113",
    text: "The population P of a certain city y years after the last census is modeled by the equation below, where r is a constant and P0 is the population when y=0. P=P0 (1+r)y. If during this time the population of the city decreases by a fixed percent each year, which of the following must be true?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) r<\u22121",
          "B) \u22121<r<0",
          "C) 0<r<1",
          "D) r>1"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_114",
    text: "In the given equation, 4x2+kx+9=0, k is a constant. The equation has exactly one solution. What is the value of k?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -12",
          "B) -6",
          "C) 6",
          "D) 12"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_115",
    text: "The expression x2\u22124x2\u2212x\u22122 , where x\ue020=\u22122 and x\ue020=2, is equivalent to which of the following?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x+2x+1",
          "B) x\u22122x\u22121",
          "C) x\u22122x+1",
          "D) x+2x\u22121"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_116",
    text: "Which of the following expressions is equivalent to x\u22122x2+3x\u221210 , for x\ue020=2?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x\u22125",
          "B) x+5",
          "C) x\u22122",
          "D) x+2"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_117",
    text: "The expression x4\u22128x2+16 can be rewritten as (x\u2212k)2(x+k)2, where k is a positive constant. What is the value of k?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 4",
          "C) 8",
          "D) 16"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_118",
    text: "y=x2\u22122x\u221215,y=x+5. If (x1 ,y1 ) and (x2 ,y2 ) are the two solutions to the system of equations above, what is the value of x1 +x2 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) 3",
          "C) 5",
          "D) 7"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_119",
    text: "If t=u\u22122u+2 , what is u in terms of t?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) t\u221212(t+1)",
          "B) t+12(t\u22121)",
          "C) 2(t\u22121)t+1",
          "D) 2(t+1)t\u22121"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_120",
    text: "y=x2\u22126x+10,y\u2212x=k. The graphs of the equations in the given system of equations intersect at the point (x,y) in the xy-plane. What is a possible value of x?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 3\u2212k\u22121",
          "B) 3+k+1",
          "C) 3\u2212k\u221210",
          "D) 3+k+10"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_121",
    text: "The table above gives selected values of a polynomial function p. Based on the values in the table, which of the following must be a factor of p?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) x\u22125",
          "B) x\u22122",
          "C) x+2",
          "D) x2\u22124"
    ],
    correctAnswer: "D",
    visual: "A table with two columns, x and p(x). The rows contain the following pairs of values: (-2, 0), (-1, 4), (0, 5), (1, 3), (2, 0).",
    visualElement: {
      type: 'table',
      description: 'Polynomial function values table',
      data: {
        headers: ['x', 'p(x)'],
        rows: [
          ['-2', '0'],
          ['-1', '4'],
          ['0', '5'],
          ['1', '3'],
          ['2', '0']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_122",
    text: "When the quadratic function f(x)=ax2+bx+c is graphed in the xy-plane, where y=f(x), its vertex is (\u22123,6). One of the x-intercepts of this graph is \u221217/4. What is the other x-intercept of the graph?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) \u221219/4",
          "B) \u22127/4",
          "C) 3",
          "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_123",
    text: "The function f is defined by f(x)=(x+4)(x\u22128). The graph of f in the xy-plane is a parabola. Which of the following intervals contains the x-coordinate of the vertex of the graph of f?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) \u22125<x<\u22123",
          "B) 1<x<3",
          "C) 3<x<5",
          "D) 5<x<7"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_124",
    text: "A landscaper is designing a rectangular garden. The length of the garden is to be 5 feet longer than the width. If the area of the garden will be 104 square feet, what will be the length, in feet, of the garden?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 13",
          "C) 18",
          "D) 26"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_125",
    text: "In the xy-plane, the graph of y=x2+x+10 intersects line p at (1,a) and (5,b), where a and b are constants. What is the slope of line p?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 6",
          "B) 7",
          "C) 10",
          "D) 12"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_126",
    text: "For the function f, f(0)=86, and for each increase in x by 1, the value of f(x) decreases by 80%. What is the value of f(2)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 3.44",
          "B) 17.2",
          "C) 68.8",
          "D) 86"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_127",
    text: "M=1,800(1.02)t. The equation above models the number of members, M, of a gym t years after the gym opens. Of the following, which equation models the number of members of the gym q quarter years after the gym opens?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) M=1,800(1.005)q",
          "B) M=1,800(1.02)q/4",
          "C) M=1,800(1.08)q",
          "D) M=1,800(1.02)4q"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_128",
    text: "D=T\u22120.006(H\u2212100). The formula above can be used to approximate the dew point D, in degrees Fahrenheit, given the temperature T, in degrees Fahrenheit, and the relative humidity of H percent, where H\u226550. Which of the following expresses the relative humidity in terms of the temperature and the dew point?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) H=100\u22120.006T\u2212D",
          "B) H=100+0.006T\u2212D",
          "C) H=100\u22120.006D\u2212T",
          "D) H=0.006D\u2212T+100"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_129",
    text: "Which of the following is equivalent to (x2+x+3)(x\u22121)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x3\u22123",
          "B) x3+2x\u22123",
          "C) x3+2x2+2x\u22123",
          "D) x3+2x+3"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_130",
    text: "The surface area of a cube is 6a2, where a is a positive constant. Which of the following gives the perimeter of one face of the cube?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) a",
          "B) 4a",
          "C) 6a",
          "D) a2"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_131",
    text: "In the xy-plane, the graph of y=x2\u22125x intersects the graph of y=x at the points (0,0) and (a,a). What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 5",
          "C) 6",
          "D) 7"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_132",
    text: "One of the factors of 2x3+14x2+24x is x+b, where b is a positive constant. What is the smallest possible value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 3",
          "C) 4",
          "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_133",
    text: "The table shows three values of x and their corresponding values of y=f(x), where f is a quadratic function. What is the y-coordinate of the y-intercept of the graph of y=f(x) in the xy-plane?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -21",
          "B) -19",
          "C) -12",
          "D) -10"
    ],
    correctAnswer: "B",
    visual: "A table with two columns, x and y. The rows contain the following pairs of values: (8, 2), (12, 2), (10, -2).",
    visualElement: {
      type: 'table',
      description: 'Coordinate data table',
      data: {
        headers: ['x', 'y'],
        rows: [
          ['8', '2'],
          ['12', '2'],
          ['10', '-2']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_134",
    text: "A quadratic function models the height, in feet, of an object above the ground in terms of the time, in seconds, after the object is launched off an elevated surface. The model indicates the object has an initial height of 180 feet above the ground and reaches its maximum height of 244 feet above the ground 2 seconds after being launched. Based on the model, what is the height, in feet, of the object above the ground 4 seconds after being launched?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 116",
          "B) 148",
          "C) 180",
          "D) 244"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_135",
    text: "The function f is defined by f(x)=a(x\u2212h)2+k, where a, h, and k are positive constants. The graph of y=f(x) in the xy-plane passes through the points (h, 5) and (2h, 9). What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 4/h^2",
          "B) 5",
          "C) 9",
          "D) h^2/4"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_136",
    text: "x\u22123x2\u2212x\u22126 =x+a. The equation is true for all x>3, where a is an integer. What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) -2",
          "B) -1",
          "C) 0",
          "D) 2"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_137",
    text: "The expression 5x2\u221215x+10 can be written in the form a(x\u2212b)(x\u2212c), where a, b, and c are constants. What is the value of a+b+c?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 9",
          "C) 10",
          "D) 12"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_138",
    text: "If a=c+d and x=a2\u2212c2\u22122cd\u2212d2, which of the following is equivalent to the expression x?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x\u2212a2",
          "B) x2\u2212a2",
          "C) (x+a)(x\u2212a)",
          "D) x\u2212a"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_139",
    text: "A rectangular poster has an area of 432 square inches. A copy of the poster is made in which the length and width of the original poster are each increased by 50%. What is the area of the copy, in square inches?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 216",
          "B) 648",
          "C) 972",
          "D) 1296"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_140",
    text: "A right circular cone has a volume of 31 \u03c0 cubic feet and a height of 9 feet. What is the radius, in feet, of the base of the cone?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 31",
          "B) 3 1",
          "C) 1",
          "D) 3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_141",
    text: "In the figure, parallel lines l and m are intersected by lines t and u. If x=65 and y=36, what is the value of z?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficulty: "hard",
    options: [
          "A) 79",
          "B) 90",
          "C) 101",
          "D) 115"
    ],
    correctAnswer: "A",
    visual: "A diagram showing two parallel horizontal lines, l and m. Two transversals, t and u, intersect the parallel lines and each other. The angle labeled x is an interior angle formed by lines l and t. The angle labeled y is an interior angle formed by lines m and u. The angle labeled z is in the triangle formed by the intersection of l, t, and u.",
    visualElement: {
      type: 'diagram',
      description: 'Parallel lines with transversals diagram',
      svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#333" stroke-width="2" fill="none"><line x1="20" y1="60" x2="280" y2="60" stroke="#2563eb"/><line x1="20" y1="140" x2="280" y2="140" stroke="#2563eb"/><line x1="80" y1="20" x2="140" y2="180" stroke="#f59e0b"/><line x1="160" y1="20" x2="220" y2="180" stroke="#10b981"/></g><g fill="#333" font-size="14" font-family="Arial"><text x="25" y="55">l</text><text x="25" y="135">m</text><text x="75" y="15">t</text><text x="155" y="15">u</text><text x="95" y="45">x</text><text x="185" y="125">y</text><text x="125" y="85">z</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_142",
    text: "In the figure above, RT\u2245TU. What is the value of x?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficulty: "hard",
    options: [
          "A) 26",
          "B) 52",
          "C) 78",
          "D) 104"
    ],
    correctAnswer: "C",
    visual: "A triangle RST with a point U on side RS. A line segment connects T and U. Angle R is 26 degrees. Angle TSU is 52 degrees. Angle RTU is x degrees.",
    visualElement: {
      type: 'diagram',
      description: 'Triangle with internal point and angles',
      svg: '<svg width="280" height="200" viewBox="0 0 280 200"><g stroke="#333" stroke-width="2" fill="none"><polygon points="40,160 240,160 140,40" stroke="#2563eb"/><line x1="120,150" x2="140,40" stroke="#f59e0b"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="35" y="175">R</text><text x="245" y="175">S</text><text x="135" y="30">T</text><text x="115" y="175">U</text><text x="50" y="145">26°</text><text x="210" y="145">52°</text><text x="125" y="65">x°</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_143",
    text: "In the xy-plane, the graph of 2x2\u22126x+2y2+2y=45 is a circle. What is the radius of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 6.5",
          "C) 40",
          "D) 50"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_144",
    text: "A grain silo is built from two right circular cones and a right circular cylinder with internal measurements represented by the figure above. Of the following, which is closest to the volume of the grain silo, in cubic feet?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 262",
          "B) 785",
          "C) 916",
          "D) 1,047"
    ],
    correctAnswer: "D",
    visual: "A diagram of a grain silo composed of a cylinder with a cone on top and a cone on the bottom. The cylinder has a height of 10 feet and a radius of 5 feet. The top cone has a height of 5 feet. The bottom cone has the same radius.",
    visualElement: {
      type: 'diagram',
      description: '3D grain silo with cylinder and cones',
      svg: '<svg width="200" height="300" viewBox="0 0 200 300"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="100" cy="70" rx="40" ry="12" fill="#d1d5db"/><polygon points="60,70 100,20 140,70" fill="#cbd5e1"/><rect x="60" y="70" width="80" height="120" fill="#e5e7eb"/><ellipse cx="100" cy="190" rx="40" ry="12" fill="#d1d5db"/><polygon points="60,190 100,240 140,190" fill="#cbd5e1"/><ellipse cx="100" cy="240" rx="40" ry="12" fill="#9ca3af"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="145" y="130">10 ft</text><text x="145" y="45">5 ft</text><text x="75" y="255">r = 5 ft</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="140" y1="70" x2="165" y2="70"/><line x1="140" y1="190" x2="165" y2="190"/><line x1="140" y1="20" x2="165" y2="20"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_145",
    text: "In the xy-plane, the graph of the equation x2+y2+4x\u22126y\u221212=0 is a circle. What are the coordinates of the center of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (\u22122,3)",
          "B) (2,\u22123)",
          "C) (4,\u22126)",
          "D) (\u22124,6)"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_146",
    text: "In triangle ABC above, sin(B)=135 . What is the length of side AC?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 10",
          "C) 12",
          "D) 24"
    ],
    correctAnswer: "B",
    visual: "A right triangle ABC with the right angle at C. The length of the hypotenuse AB is 26.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with hypotenuse labeled',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">C</text><text x="145" y="50">B</text><text x="70" y="90">26</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_147",
    text: "In triangles ABC and DEF, angles B and E each have measure 27 degrees, and angles C and F each have measure 45 degrees. Which additional piece of information is sufficient to prove that triangle ABC is congruent to triangle DEF?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Lines, angles, and triangles",
    difficulty: "hard",
    options: [
          "A) The measure of angle A is 108 degrees.",
          "B) The length of side BC is equal to the length of side EF.",
          "C) The length of side AB is equal to the length of side DE.",
          "D) The length of side AC is equal to the length of side DF."
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_148",
    text: "The equation x2+y2\u22126x+8y=144 defines a circle in the xy-plane. What are the coordinates of the center of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (\u22123,4)",
          "B) (3,\u22124)",
          "C) (6,\u22128)",
          "D) (\u22126,8)"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_149",
    text: "In the triangle shown, what is the value of tan(x)?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 16/23",
          "B) 23/16",
          "C) 16/sqrt(785)",
          "D) 23/sqrt(785)"
    ],
    correctAnswer: "A",
    visual: "A right triangle with angles x and y. The side opposite x is 16. The side opposite y is 23.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with angle labels and opposite sides',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="25" y="130">x</text><text x="130" y="70">y</text><text x="150" y="100">16</text><text x="75" y="135">23</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_150",
    text: "Point O is the center of the circle above, and the measure of angle AOB is 3\u03c0 radians. If the length of OA is 18, what is the length of arc AB?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 3\u03c0",
          "B) 6\u03c0",
          "C) 9\u03c0",
          "D) 12\u03c0"
    ],
    correctAnswer: "B",
    visual: "A circle with center O. Points A and B are on the circle, forming an arc.",
    visualElement: {
      type: 'diagram',
      description: 'Circle with center and arc points',
      svg: '<svg width="200" height="200" viewBox="0 0 200 200"><g stroke="#333" stroke-width="2" fill="none"><circle cx="100" cy="100" r="60" stroke="#2563eb"/><line x1="100" y1="100" x2="140" y2="60"/><line x1="100" y1="100" x2="160" y2="100"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="95" y="105">O</text><text x="135" y="50">A</text><text x="165" y="105">B</text></g><g fill="#ef4444"><circle cx="100" cy="100" r="3"/><circle cx="140" cy="60" r="3"/><circle cx="160" cy="100" r="3"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_151",
    text: "In the xy-plane, the graph of the equation y=x2\u22128x+12 is a parabola. What is the distance between the x-intercepts of the parabola?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 4",
          "C) 6",
          "D) 8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_152",
    text: "The equation x2+y2\u22126x+8y=144 defines a circle in the xy-plane. What is the radius of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 13",
          "D) 144"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_153",
    text: "In the xy-plane, the graph of y=3x2\u221214x intersects the graph of y=x at the points (0,0) and (a,a). What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 4",
          "C) 5",
          "D) 6"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_154",
    text: "The number of radians in a 720-degree angle can be written as k\u03c0, where k is a constant. What is the value of k?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 4",
          "C) 6",
          "D) 8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_155",
    text: "A right triangle has sides of length x, y, and z, where z is the hypotenuse. If the perimeter of the triangle is 30 and the area is 30, what is the value of z?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 13",
          "D) 15"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_156",
    text: "In the xy-plane, the graph of the function f(x)=x2+5x+4 has two x-intercepts. What is the distance between the x-intercepts?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 1",
          "B) 2",
          "C) 3",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_157",
    text: "A right circular cone has a height of 12 and a radius of 5. What is the volume of the cone?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 25\u03c0",
          "B) 100\u03c0",
          "C) 300\u03c0",
          "D) 400\u03c0"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_158",
    text: "In the xy-plane, the point (3,6) lies on the graph of the function f(x)=3x2\u2212bx+12. What is the value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) 3",
          "C) 9",
          "D) 15"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_159",
    text: "The equation of a circle in the xy-plane is shown above. What is the radius of the circle? x2+y2\u22126x+8y=144",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 13",
          "D) 144"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_160",
    text: "The expression x+35x\u22122 is equivalent to which of the following?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 5\u221232",
          "B) 5\u2212x+317",
          "C) 5\u2212x+32",
          "D) 1+3/x5\u22122/x"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_161",
    text: "The table above shows the distribution of age and gender for 25 people who entered a contest. If the contest winner is selected at random, what is the probability that the winner will be either a female under age 40 or a male age 40 or older?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 4/25",
          "B) 10/25",
          "C) 14/25",
          "D) 16/25"
    ],
    correctAnswer: "B",
    visual: "A table with columns for Male and Female, and rows for Under age 40 and Age 40 or older. The data is: Male Under 40: 8, Female Under 40: 8, Male 40 or older: 2, Female 40 or older: 7.",
    visualElement: {
      type: 'table',
      description: 'Demographics table',
      data: {
        headers: ['', 'Male', 'Female'],
        rows: [
          ['Under age 40', '8', '8'],
          ['Age 40 or older', '2', '7']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_162",
    text: "The graph of a line in the xy-plane has slope 2 and contains the point (1, 8). The graph of a second line passes through the points (1, 2) and (2, 1). If the two lines intersect at the point (a, b), what is the value of a+b?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 1",
          "C) -1",
          "D) -4"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_163",
    text: "Which of the following equations has a graph in the xy-plane for which y is always greater than or equal to -1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) y=\u2223x\u2223\u22122",
          "B) y=x2\u22122",
          "C) y=(x\u22122)2",
          "D) y=x3\u22122"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_164",
    text: "Which of the following complex numbers is equivalent to 8+2i3\u22125i ? (Note: i=\u22121 )",
    category: "math",
    domain: "Additional Topics in Math",
    skill: "Complex numbers",
    difficulty: "hard",
    options: [
          "A) 347 \u22123423i",
          "B) 347 +3423i",
          "C) 6814 \u22126846i",
          "D) 6814 +6846i"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_165",
    text: "A website-hosting service charges businesses a onetime setup fee of $350 plus d dollars for each month. If a business owner paid $1,010 for the first 12 months, including the setup fee, what is the value of d?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) 25",
          "B) 35",
          "C) 45",
          "D) 55"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_166",
    text: "2x(3x+5)+3(3x+5)=ax2+bx+c. In the equation above, a, b, and c are constants. If the equation is true for all values of x, what is the value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 16",
          "C) 19",
          "D) 31"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_167",
    text: "A circle in the xy-plane has center (5, -12) and radius 8. Which of the following is an equation of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (x\u22125)2+(y+12)2=64",
          "B) (x+5)2+(y\u221212)2=64",
          "C) (x\u22125)2+(y+12)2=8",
          "D) (x+5)2+(y\u221212)2=8"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_168",
    text: "In the figure above, triangle ABC is similar to triangle DEF. What is the value of cos(E)?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 12/13",
          "B) 5/13",
          "C) 12/5",
          "D) 5/12"
    ],
    correctAnswer: "B",
    visual: "A right triangle ABC with right angle at B. AB=12, BC=5, AC=13.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with labeled sides',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">B</text><text x="145" y="50">C</text><text x="75" y="135">12</text><text x="150" y="100">5</text><text x="70" y="95">13</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_169",
    text: "A dairy farmer uses a storage silo that is in the shape of the right circular cylinder above. If the volume of the silo is 72pi cubic yards, what is the diameter of the base of the cylinder, in yards?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 6",
          "C) 9",
          "D) 12"
    ],
    correctAnswer: "B",
    visual: "A right circular cylinder with a height of 8 yards.",
    visualElement: {
      type: 'diagram',
      description: '3D cylinder with height labeled',
      svg: '<svg width="150" height="200" viewBox="0 0 150 200"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="75" cy="40" rx="35" ry="10"/><rect x="40" y="40" width="70" height="120" fill="#e5e7eb"/><ellipse cx="75" cy="160" rx="35" ry="10"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="120" y="105">8 yd</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="110" y1="40" x2="130" y2="40"/><line x1="110" y1="160" x2="130" y2="160"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_170",
    text: "For what value of x is the function h(x) = 1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -1",
          "B) 0",
          "C) 1",
          "D) 2"
    ],
    correctAnswer: "D",
    visual: "A graph of a function h(x) is shown. It passes through the points (-1, -2), (0, -1), (1, 0), (2, 1), (3, 2).",
    visualElement: {
      type: 'graph',
      description: 'Linear function graph',
      data: {
        xRange: [-2, 4],
        yRange: [-3, 3],
        lines: [
          { points: [[-1, -2], [0, -1], [1, 0], [2, 1], [3, 2]], color: '#2563eb' }
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_171",
    text: "The formula for the monthly payment, m, on a loan is given by the formula m=(1+r)n\u22121Pr(1+r)n , where P is the principal, r is the monthly interest rate, and n is the number of months. Which of the following gives P in terms of m, r, and n?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) P=r(1+r)nm(1+r)n\u22121",
          "B) P=(1+r)n\u22121m(1+r)n",
          "C) P=r(1+r)nm(1+r)n\u2212m",
          "D) P=(1+r)n\u22121mr(1+r)n"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_172",
    text: "If ba =2, what is the value of a4b ?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) 1",
          "C) 2",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_173",
    text: "The scatterplot above shows the relationship between the number of hours that a group of students spent studying for a test and their scores on the test. Which of the following is the best interpretation of the y-intercept of the line of best fit?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficulty: "hard",
    options: [
          "A) The predicted score of a student who studied for 0 hours.",
          "B) The predicted score of a student who studied for 10 hours.",
          "C) The predicted increase in score for each additional hour of study.",
          "D) The predicted number of hours of study for a student who scored 0."
    ],
    correctAnswer: "A",
    visual: "A scatterplot with \"Hours of Study\" on the x-axis and \"Test Score\" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.",
    visualElement: {
      type: 'graph',
      description: 'Scatterplot with study hours vs test scores',
      svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="30" x2="50" y2="200"/><line x1="50" y1="200" x2="270" y2="200"/></g><g fill="#2563eb"><circle cx="70" cy="180" r="3"/><circle cx="90" cy="170" r="3"/><circle cx="110" cy="160" r="3"/><circle cx="130" cy="150" r="3"/><circle cx="150" cy="140" r="3"/><circle cx="170" cy="130" r="3"/><circle cx="190" cy="120" r="3"/><circle cx="210" cy="110" r="3"/><circle cx="230" cy="100" r="3"/><circle cx="250" cy="90" r="3"/></g><g stroke="#f59e0b" stroke-width="2" fill="none"><line x1="50" y1="185" x2="270" y2="85"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="140" y="230">Hours of Study</text><text x="10" y="120" transform="rotate(-90 10,120)">Test Score</text><text x="45" y="190">60</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_174",
    text: "A survey was conducted among a random sample of 250 students at a high school. The survey found that 175 students have a driver's license. If the high school has 1,200 students, which of the following is the most reasonable estimate for the number of students at the high school who have a driver's license?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "hard",
    options: [
          "A) 70",
          "B) 175",
          "C) 840",
          "D) 1025"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_175",
    text: "The table above shows the number of people in a survey who own a car and the number of people who own a bicycle. Based on the table, what is the probability that a person chosen at random owns a car, given that the person owns a bicycle?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 15/23",
          "B) 15/27",
          "C) 23/40",
          "D) 27/40"
    ],
    correctAnswer: "A",
    visual: "A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.",
    visualElement: {
      type: 'table',
      description: 'Venn diagram data table',
      data: {
        headers: ['Category', 'Count'],
        rows: [
          ['Car only', '12'],
          ['Bicycle only', '8'],
          ['Both car and bicycle', '15'],
          ['Neither', '5']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_176",
    text: "The graph of a line in the xy-plane passes through the point (1,4) and crosses the x-axis at the point (2,0). The line crosses the y-axis at the point (0,b). What is the value of b?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) 0",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_177",
    text: "In the xy-plane, the parabola with equation y=(x\u221211)2 intersects the line with equation y=25 at two points, A and B. What is the length of the segment AB?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 12",
          "C) 14",
          "D) 16"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_178",
    text: "In the xy-plane, the line with equation y=3x+2 is parallel to the line with equation y=ax+b. What is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -2",
          "C) 2",
          "D) 3"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_179",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_180",
    text: "If f(x)=\u22122x+5, what is f(\u22123x) equal to?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 6x+5",
          "B) 6x\u22125",
          "C) \u22126x+5",
          "D) \u22126x\u22125"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_181",
    text: "A system of three equations is shown above. What is the value of x+y+z?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 15",
          "C) 20",
          "D) 30"
    ],
    correctAnswer: "B",
    visual: "Three equations are shown: x+y=8, y+z=12, x+z=10.",
    visualElement: {
      type: 'diagram',
      description: 'System of three equations',
      svg: '<svg width="200" height="120" viewBox="0 0 200 120"><g fill="#333" font-size="16" font-family="Arial, sans-serif"><text x="20" y="30">x + y = 8</text><text x="20" y="60">y + z = 12</text><text x="20" y="90">x + z = 10</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_182",
    text: "The expression 2x+11 is equivalent to which of the following?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 4x2\u221212x\u22121",
          "B) 4x2+12x+1",
          "C) 4x2+12x\u22121",
          "D) 4x2\u221212x+1"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_183",
    text: "The graph of a line in the xy-plane passes through the origin and has a slope of 1/7. Which of the following points lies on the line?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) (0,7)",
          "B) (1,7)",
          "C) (7,1)",
          "D) (14,2)"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_184",
    text: "If x>3, which of the following is equivalent to x+21 +x+31 1 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x2+5x+62x+5",
          "B) 2x+5x2+5x+6",
          "C) 2x+5",
          "D) x2+5x+6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_185",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_186",
    text: "If f(x)=x\u22121x2\u22126x+3 , what is f(\u22121)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -5",
          "B) -2",
          "C) 2",
          "D) 5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_187",
    text: "A circle in the xy-plane has center (5,-12) and radius 8. Which of the following is an equation of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (x\u22125)2+(y+12)2=64",
          "B) (x+5)2+(y\u221212)2=64",
          "C) (x\u22125)2+(y+12)2=8",
          "D) (x+5)2+(y\u221212)2=8"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_188",
    text: "In the figure above, triangle ABC is similar to triangle DEF. What is the value of cos(E)?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 12/13",
          "B) 5/13",
          "C) 12/5",
          "D) 5/12"
    ],
    correctAnswer: "B",
    visual: "A right triangle ABC with right angle at B. AB=12, BC=5, AC=13.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with labeled sides',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">B</text><text x="145" y="50">C</text><text x="75" y="135">12</text><text x="150" y="100">5</text><text x="70" y="95">13</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_189",
    text: "A dairy farmer uses a storage silo that is in the shape of the right circular cylinder above. If the volume of the silo is 72pi cubic yards, what is the diameter of the base of the cylinder, in yards?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 6",
          "C) 9",
          "D) 12"
    ],
    correctAnswer: "B",
    visual: "A right circular cylinder with a height of 8 yards.",
    visualElement: {
      type: 'diagram',
      description: '3D cylinder with height labeled',
      svg: '<svg width="150" height="200" viewBox="0 0 150 200"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="75" cy="40" rx="35" ry="10"/><rect x="40" y="40" width="70" height="120" fill="#e5e7eb"/><ellipse cx="75" cy="160" rx="35" ry="10"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="120" y="105">8 yd</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="110" y1="40" x2="130" y2="40"/><line x1="110" y1="160" x2="130" y2="160"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_190",
    text: "For what value of x is the function h(x) = 1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -1",
          "B) 0",
          "C) 1",
          "D) 2"
    ],
    correctAnswer: "D",
    visual: "A graph of a function h(x) is shown. It passes through the points (-1, -2), (0, -1), (1, 0), (2, 1), (3, 2).",
    visualElement: {
      type: 'graph',
      description: 'Linear function graph',
      data: {
        xRange: [-2, 4],
        yRange: [-3, 3],
        lines: [
          { points: [[-1, -2], [0, -1], [1, 0], [2, 1], [3, 2]], color: '#2563eb' }
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_191",
    text: "The formula for the monthly payment, m, on a loan is given by the formula m=(1+r)n\u22121Pr(1+r)n , where P is the principal, r is the monthly interest rate, and n is the number of months. Which of the following gives P in terms of m, r, and n?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) P=r(1+r)nm(1+r)n\u22121",
          "B) P=(1+r)n\u22121m(1+r)n",
          "C) P=r(1+r)nm(1+r)n\u2212m",
          "D) P=(1+r)n\u22121mr(1+r)n"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_192",
    text: "If ba =2, what is the value of a4b ?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) 1",
          "C) 2",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_193",
    text: "The scatterplot above shows the relationship between the number of hours that a group of students spent studying for a test and their scores on the test. Which of the following is the best interpretation of the y-intercept of the line of best fit?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficulty: "hard",
    options: [
          "A) The predicted score of a student who studied for 0 hours.",
          "B) The predicted score of a student who studied for 10 hours.",
          "C) The predicted increase in score for each additional hour of study.",
          "D) The predicted number of hours of study for a student who scored 0."
    ],
    correctAnswer: "A",
    visual: "A scatterplot with \"Hours of Study\" on the x-axis and \"Test Score\" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.",
    visualElement: {
      type: 'graph',
      description: 'Scatterplot with study hours vs test scores',
      data: {
        xRange: [0, 12],
        yRange: [40, 100],
        points: [
          { x: 1, y: 62 },
          { x: 2, y: 65 },
          { x: 3, y: 68 },
          { x: 4, y: 71 },
          { x: 5, y: 74 },
          { x: 6, y: 77 },
          { x: 7, y: 80 },
          { x: 8, y: 83 },
          { x: 9, y: 86 },
          { x: 10, y: 89 }
        ],
        lines: [
          { points: [[0, 60], [10, 90]], color: '#f59e0b', style: 'dashed' }
        ],
        xLabel: 'Hours of Study',
        yLabel: 'Test Score'
      }
    },
    source: "College Board"
  },
  {
    id: "math_194",
    text: "A survey was conducted among a random sample of 250 students at a high school. The survey found that 175 students have a driver's license. If the high school has 1,200 students, which of the following is the most reasonable estimate for the number of students at the high school who have a driver's license?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "hard",
    options: [
          "A) 70",
          "B) 175",
          "C) 840",
          "D) 1025"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_195",
    text: "The table above shows the number of people in a survey who own a car and the number of people who own a bicycle. Based on the table, what is the probability that a person chosen at random owns a car, given that the person owns a bicycle?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 15/23",
          "B) 15/27",
          "C) 23/40",
          "D) 27/40"
    ],
    correctAnswer: "A",
    visual: "A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.",
    visualElement: {
      type: 'table',
      description: 'Venn diagram data table',
      data: {
          "headers": [
              "Category",
              "Count"
          ],
          "rows": [
              [
                  "Car only",
                  "12"
              ],
              [
                  "Bicycle only",
                  "8"
              ],
              [
                  "Both car and bicycle",
                  "15"
              ],
              [
                  "Neither",
                  "5"
              ]
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_196",
    text: "The graph of a line in the xy-plane passes through the point (1,4) and crosses the x-axis at the point (2,0). The line crosses the y-axis at the point (0,b). What is the value of b?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) 0",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_197",
    text: "In the xy-plane, the parabola with equation y=(x\u221211)2 intersects the line with equation y=25 at two points, A and B. What is the length of the segment AB?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 12",
          "C) 14",
          "D) 16"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_198",
    text: "In the xy-plane, the line with equation y=3x+2 is parallel to the line with equation y=ax+b. What is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -2",
          "C) 2",
          "D) 3"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_199",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_200",
    text: "If f(x)=\u22122x+5, what is f(\u22123x) equal to?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 6x+5",
          "B) 6x\u22125",
          "C) \u22126x+5",
          "D) \u22126x\u22125"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_201",
    text: "The table shows the results of a survey in which tablet users were asked how often they would watch video advertisements in order to access streaming content for free. Based on the survey, which of the following is closest to the probability that a tablet user answered \"Always,\" given that the tablet user did not answer \"Never\"?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 0.31",
          "B) 0.36",
          "C) 0.44",
          "D) 0.69"
    ],
    correctAnswer: "B",
    visual: "A table with two columns: Answer and Percent of tablet users. The data is: Always, 30.9%; Often, 36.8%; Rarely, 19.1%; Never, 13.2%.",
    visualElement: {
      type: 'table',
      description: 'Survey response table',
      data: {
          "headers": [
              "Answer",
              "Percent of tablet users"
          ],
          "rows": [
              [
                  "Always",
                  "30.9%"
              ],
              [
                  "Often",
                  "36.8%"
              ],
              [
                  "Rarely",
                  "19.1%"
              ],
              [
                  "Never",
                  "13.2%"
              ]
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_202",
    text: "The scatterplot above shows the relationship between the number of male and female students in a certain country who were enrolled in college from 2000 to 2010. A line of best fit for the data is also shown. Which of the following is the best interpretation of the slope of the line of best fit?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficulty: "hard",
    options: [
          "A) For every 1 million male students enrolled in college, there were approximately 1.04 million female students enrolled.",
          "B) For every 1 million female students enrolled in college, there were approximately 1.04 million male students enrolled.",
          "C) The number of female students enrolled in college was approximately 1.04 million more than the number of male students enrolled.",
          "D) The number of male students enrolled in college was approximately 1.04 million more than the number of female students enrolled."
    ],
    correctAnswer: "A",
    visual: "A scatterplot with \"Number of male students (millions)\" on the x-axis and \"Number of female students (millions)\" on the y-axis. The data points show a positive correlation. A line of best fit is drawn.",
    visualElement: {
      type: 'graph',
      description: 'Scatterplot with male vs female student enrollment',
      data: {
        xRange: [0, 8],
        yRange: [0, 10],
        points: [
          { x: 3.2, y: 3.8 },
          { x: 3.8, y: 4.2 },
          { x: 4.1, y: 4.6 },
          { x: 4.5, y: 5.0 },
          { x: 4.9, y: 5.4 },
          { x: 5.2, y: 5.7 },
          { x: 5.6, y: 6.1 },
          { x: 6.0, y: 6.5 },
          { x: 6.3, y: 6.8 },
          { x: 6.7, y: 7.2 }
        ],
        lines: [
          { points: [[3, 3.5], [7, 7.5]], color: '#f59e0b', style: 'dashed' }
        ],
        xLabel: 'Number of male students (millions)',
        yLabel: 'Number of female students (millions)'
      }
    },
    source: "College Board"
  },
  {
    id: "math_203",
    text: "In the xy-plane, the graph of y=3(x\u22125)2+4 is a parabola. Which of the following is the vertex of the parabola?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) (3,4)",
          "B) (5,4)",
          "C) (-5,4)",
          "D) (-3,4)"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_204",
    text: "For which of the following values of x is the function f(x)=3x\u22129 +5 NOT defined?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 4",
          "C) 5",
          "D) 2"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_205",
    text: "A hospital stores one type of medicine in 2-decagram containers. Based on the information given in the box above, how many 1-milligram doses are there in one 2-decagram container?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) 200",
          "B) 2,000",
          "C) 20,000",
          "D) 200,000"
    ],
    correctAnswer: "C",
    visual: "A box with the text \"1 decagram = 10 grams, 1,000 milligrams = 1 gram\".",
    visualElement: {
      type: 'diagram',
      description: 'Unit conversion reference box',
      data: {
        content: [
          '1 decagram = 10 grams',
          '1,000 milligrams = 1 gram'
        ],
        style: 'info-box'
      }
    },
    source: "College Board"
  },
  {
    id: "math_206",
    text: "The number of rooftops with solar panel installations in 5 cities is shown in the graph above. If the total number of installations is 27,500, what is an appropriate label for the vertical axis of the graph?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) Number of installations (in tens)",
          "B) Number of installations (in hundreds)",
          "C) Number of installations (in thousands)",
          "D) Number of installations (in tens of thousands)"
    ],
    correctAnswer: "C",
    visual: "A bar chart showing the number of installations in 5 cities (A, B, C, D, E). The y-axis is unlabeled. The bar for City A goes up to 9, B to 5, C to 6, D to 4, and E to 3.5.",
    visualElement: {
      type: 'chart',
      description: 'Solar panel installations bar chart',
      svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="20" x2="50" y2="180"/><line x1="50" y1="180" x2="270" y2="180"/></g><g fill="#2563eb" stroke="#333" stroke-width="1"><rect x="70" y="40" width="30" height="140"/><rect x="110" y="100" width="30" height="80"/><rect x="150" y="84" width="30" height="96"/><rect x="190" y="116" width="30" height="64"/><rect x="230" y="124" width="30" height="56"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="82" y="195">A</text><text x="122" y="195">B</text><text x="162" y="195">C</text><text x="202" y="195">D</text><text x="242" y="195">E</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_207",
    text: "For what value of n is \u2223n\u22121\u2223+1 equal to 0?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) 1",
          "C) 2",
          "D) There is no such value of n."
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_208",
    text: "A survey was conducted among a random sample of 250 students at a high school. The survey found that 175 students have a driver's license. If the high school has 1,200 students, which of the following is the most reasonable estimate for the number of students at the high school who have a driver's license?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "hard",
    options: [
          "A) 70",
          "B) 175",
          "C) 840",
          "D) 1025"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_209",
    text: "The table above shows the number of people in a survey who own a car and the number of people who own a bicycle. Based on the table, what is the probability that a person chosen at random owns a car, given that the person owns a bicycle?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 15/23",
          "B) 15/27",
          "C) 23/40",
          "D) 27/40"
    ],
    correctAnswer: "A",
    visual: "A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.",
    visualElement: {
      type: 'table',
      description: 'Venn diagram data table',
      data: {
          "headers": [
              "Category",
              "Count"
          ],
          "rows": [
              [
                  "Car only",
                  "12"
              ],
              [
                  "Bicycle only",
                  "8"
              ],
              [
                  "Both car and bicycle",
                  "15"
              ],
              [
                  "Neither",
                  "5"
              ]
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_210",
    text: "The graph of a line in the xy-plane passes through the point (1,4) and crosses the x-axis at the point (2,0). The line crosses the y-axis at the point (0,b). What is the value of b?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) 0",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_211",
    text: "In the xy-plane, the parabola with equation y=(x\u221211)2 intersects the line with equation y=25 at two points, A and B. What is the length of the segment AB?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 12",
          "C) 14",
          "D) 16"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_212",
    text: "In the xy-plane, the line with equation y=3x+2 is parallel to the line with equation y=ax+b. What is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -2",
          "C) 2",
          "D) 3"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_213",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_214",
    text: "If f(x)=\u22122x+5, what is f(\u22123x) equal to?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 6x+5",
          "B) 6x\u22125",
          "C) \u22126x+5",
          "D) \u22126x\u22125"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_215",
    text: "A system of three equations is shown above. What is the value of x+y+z?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 15",
          "C) 20",
          "D) 30"
    ],
    correctAnswer: "B",
    visual: "Three equations are shown: x+y=8, y+z=12, x+z=10.",
    visualElement: {
      type: 'diagram',
      description: 'System of three equations',
      svg: '<svg width="200" height="120" viewBox="0 0 200 120"><g fill="#333" font-size="16" font-family="Arial, sans-serif"><text x="20" y="30">x + y = 8</text><text x="20" y="60">y + z = 12</text><text x="20" y="90">x + z = 10</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_216",
    text: "The expression 2x+11 is equivalent to which of the following?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 4x2\u221212x\u22121",
          "B) 4x2+12x+1",
          "C) 4x2+12x\u22121",
          "D) 4x2\u221212x+1"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_217",
    text: "The graph of a line in the xy-plane passes through the origin and has a slope of 1/7. Which of the following points lies on the line?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) (0,7)",
          "B) (1,7)",
          "C) (7,1)",
          "D) (14,2)"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_218",
    text: "If x>3, which of the following is equivalent to x+21 +x+31 1 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x2+5x+62x+5",
          "B) 2x+5x2+5x+6",
          "C) 2x+5",
          "D) x2+5x+6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_219",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_220",
    text: "If f(x)=x\u22121x2\u22126x+3 , what is f(\u22121)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -5",
          "B) -2",
          "C) 2",
          "D) 5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_221",
    text: "A circle in the xy-plane has center (5,-12) and radius 8. Which of the following is an equation of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (x\u22125)2+(y+12)2=64",
          "B) (x+5)2+(y\u221212)2=64",
          "C) (x\u22125)2+(y+12)2=8",
          "D) (x+5)2+(y\u221212)2=8"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_222",
    text: "In the figure above, triangle ABC is similar to triangle DEF. What is the value of cos(E)?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 12/13",
          "B) 5/13",
          "C) 12/5",
          "D) 5/12"
    ],
    correctAnswer: "B",
    visual: "A right triangle ABC with right angle at B. AB=12, BC=5, AC=13.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with labeled sides',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">B</text><text x="145" y="50">C</text><text x="75" y="135">12</text><text x="150" y="100">5</text><text x="70" y="95">13</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_223",
    text: "A dairy farmer uses a storage silo that is in the shape of the right circular cylinder above. If the volume of the silo is 72pi cubic yards, what is the diameter of the base of the cylinder, in yards?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 6",
          "C) 9",
          "D) 12"
    ],
    correctAnswer: "B",
    visual: "A right circular cylinder with a height of 8 yards.",
    visualElement: {
      type: 'diagram',
      description: '3D cylinder with height labeled',
      svg: '<svg width="150" height="200" viewBox="0 0 150 200"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="75" cy="40" rx="35" ry="10"/><rect x="40" y="40" width="70" height="120" fill="#e5e7eb"/><ellipse cx="75" cy="160" rx="35" ry="10"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="120" y="105">8 yd</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="110" y1="40" x2="130" y2="40"/><line x1="110" y1="160" x2="130" y2="160"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_224",
    text: "For what value of x is the function h(x) = 1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -1",
          "B) 0",
          "C) 1",
          "D) 2"
    ],
    correctAnswer: "D",
    visual: "A graph of a function h(x) is shown. It passes through the points (-1, -2), (0, -1), (1, 0), (2, 1), (3, 2).",
    visualElement: {
      type: 'graph',
      description: 'Linear function graph',
      data: {
        xRange: [-2, 4],
        yRange: [-3, 3],
        lines: [
          { points: [[-1, -2], [0, -1], [1, 0], [2, 1], [3, 2]], color: '#2563eb' }
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_225",
    text: "The formula for the monthly payment, m, on a loan is given by the formula m=(1+r)n\u22121Pr(1+r)n , where P is the principal, r is the monthly interest rate, and n is the number of months. Which of the following gives P in terms of m, r, and n?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) P=r(1+r)nm(1+r)n\u22121",
          "B) P=(1+r)n\u22121m(1+r)n",
          "C) P=r(1+r)nm(1+r)n\u2212m",
          "D) P=(1+r)n\u22121mr(1+r)n"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_226",
    text: "If ba =2, what is the value of a4b ?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) 1",
          "C) 2",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_227",
    text: "The scatterplot above shows the relationship between the number of hours that a group of students spent studying for a test and their scores on the test. Which of the following is the best interpretation of the y-intercept of the line of best fit?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficulty: "hard",
    options: [
          "A) The predicted score of a student who studied for 0 hours.",
          "B) The predicted score of a student who studied for 10 hours.",
          "C) The predicted increase in score for each additional hour of study.",
          "D) The predicted number of hours of study for a student who scored 0."
    ],
    correctAnswer: "A",
    visual: "A scatterplot with \"Hours of Study\" on the x-axis and \"Test Score\" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.",
    visualElement: {
      type: 'graph',
      description: 'Scatterplot with study hours vs test scores',
      data: {
        xRange: [0, 12],
        yRange: [40, 100],
        points: [
          { x: 1, y: 62 },
          { x: 2, y: 65 },
          { x: 3, y: 68 },
          { x: 4, y: 71 },
          { x: 5, y: 74 },
          { x: 6, y: 77 },
          { x: 7, y: 80 },
          { x: 8, y: 83 },
          { x: 9, y: 86 },
          { x: 10, y: 89 }
        ],
        lines: [
          { points: [[0, 60], [10, 90]], color: '#f59e0b', style: 'dashed' }
        ],
        xLabel: 'Hours of Study',
        yLabel: 'Test Score'
      }
    },
    source: "College Board"
  },
  {
    id: "math_228",
    text: "A survey was conducted among a random sample of 250 students at a high school. The survey found that 175 students have a driver's license. If the high school has 1,200 students, which of the following is the most reasonable estimate for the number of students at the high school who have a driver's license?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "hard",
    options: [
          "A) 70",
          "B) 175",
          "C) 840",
          "D) 1025"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_229",
    text: "The table above shows the number of people in a survey who own a car and the number of people who own a bicycle. Based on the table, what is the probability that a person chosen at random owns a car, given that the person owns a bicycle?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 15/23",
          "B) 15/27",
          "C) 23/40",
          "D) 27/40"
    ],
    correctAnswer: "A",
    visual: "A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.",
    visualElement: {
      type: 'table',
      description: 'Venn diagram data table',
      data: {
          "headers": [
              "Category",
              "Count"
          ],
          "rows": [
              [
                  "Car only",
                  "12"
              ],
              [
                  "Bicycle only",
                  "8"
              ],
              [
                  "Both car and bicycle",
                  "15"
              ],
              [
                  "Neither",
                  "5"
              ]
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_230",
    text: "The graph of a line in the xy-plane passes through the point (1,4) and crosses the x-axis at the point (2,0). The line crosses the y-axis at the point (0,b). What is the value of b?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) 0",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_231",
    text: "In the xy-plane, the parabola with equation y=(x\u221211)2 intersects the line with equation y=25 at two points, A and B. What is the length of the segment AB?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 12",
          "C) 14",
          "D) 16"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_232",
    text: "In the xy-plane, the line with equation y=3x+2 is parallel to the line with equation y=ax+b. What is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) -2",
          "C) 2",
          "D) 3"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_233",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_234",
    text: "If f(x)=\u22122x+5, what is f(\u22123x) equal to?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 6x+5",
          "B) 6x\u22125",
          "C) \u22126x+5",
          "D) \u22126x\u22125"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_235",
    text: "A system of three equations is shown above. What is the value of x+y+z?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 10",
          "B) 15",
          "C) 20",
          "D) 30"
    ],
    correctAnswer: "B",
    visual: "Three equations are shown: x+y=8, y+z=12, x+z=10.",
    visualElement: {
      type: 'diagram',
      description: 'System of three equations',
      svg: '<svg width="200" height="120" viewBox="0 0 200 120"><g fill="#333" font-size="16" font-family="Arial, sans-serif"><text x="20" y="30">x + y = 8</text><text x="20" y="60">y + z = 12</text><text x="20" y="90">x + z = 10</text></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_236",
    text: "The expression 2x+11 is equivalent to which of the following?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 4x2\u221212x\u22121",
          "B) 4x2+12x+1",
          "C) 4x2+12x\u22121",
          "D) 4x2\u221212x+1"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_237",
    text: "The graph of a line in the xy-plane passes through the origin and has a slope of 1/7. Which of the following points lies on the line?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) (0,7)",
          "B) (1,7)",
          "C) (7,1)",
          "D) (14,2)"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_238",
    text: "If x>3, which of the following is equivalent to x+21 +x+31 1 ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) x2+5x+62x+5",
          "B) 2x+5x2+5x+6",
          "C) 2x+5",
          "D) x2+5x+6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_239",
    text: "If 3x\u2212y=12, what is the value of 2y8x ?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 212",
          "B) 44",
          "C) 82",
          "D) The value cannot be determined from the information given."
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_240",
    text: "If f(x)=x\u22121x2\u22126x+3 , what is f(\u22121)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -5",
          "B) -2",
          "C) 2",
          "D) 5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_241",
    text: "A circle in the xy-plane has center (5,-12) and radius 8. Which of the following is an equation of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (x\u22125)2+(y+12)2=64",
          "B) (x+5)2+(y\u221212)2=64",
          "C) (x\u22125)2+(y+12)2=8",
          "D) (x+5)2+(y\u221212)2=8"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_242",
    text: "In the figure above, triangle ABC is similar to triangle DEF. What is the value of cos(E)?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 12/13",
          "B) 5/13",
          "C) 12/5",
          "D) 5/12"
    ],
    correctAnswer: "B",
    visual: "A right triangle ABC with right angle at B. AB=12, BC=5, AC=13.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with labeled sides',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">B</text><text x="145" y="50">C</text><text x="75" y="135">12</text><text x="150" y="100">5</text><text x="70" y="95">13</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_243",
    text: "A dairy farmer uses a storage silo that is in the shape of the right circular cylinder above. If the volume of the silo is 72pi cubic yards, what is the diameter of the base of the cylinder, in yards?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 6",
          "C) 9",
          "D) 12"
    ],
    correctAnswer: "B",
    visual: "A right circular cylinder with a height of 8 yards.",
    visualElement: {
      type: 'diagram',
      description: '3D cylinder with height labeled',
      svg: '<svg width="150" height="200" viewBox="0 0 150 200"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="75" cy="40" rx="35" ry="10"/><rect x="40" y="40" width="70" height="120" fill="#e5e7eb"/><ellipse cx="75" cy="160" rx="35" ry="10"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="120" y="105">8 yd</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="110" y1="40" x2="130" y2="40"/><line x1="110" y1="160" x2="130" y2="160"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_244",
    text: "For what value of x is the function h(x) = 1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -1",
          "B) 0",
          "C) 1",
          "D) 2"
    ],
    correctAnswer: "D",
    visual: "A graph of a function h(x) is shown. It passes through the points (-1, -2), (0, -1), (1, 0), (2, 1), (3, 2).",
    visualElement: {
      type: 'graph',
      description: 'Linear function graph',
      data: {
          "xRange": [
              -2,
              4
          ],
          "yRange": [
              -3,
              3
          ],
          "lines": [
              {
                  "points": [
                      [
                          -1,
                          -2
                      ],
                      [
                          0,
                          -1
                      ],
                      [
                          1,
                          0
                      ],
                      [
                          2,
                          1
                      ],
                      [
                          3,
                          2
                      ]
                  ],
                  "color": "#2563eb"
              }
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_245",
    text: "The formula for the monthly payment, m, on a loan is given by the formula m=(1+r)n\u22121Pr(1+r)n , where P is the principal, r is the monthly interest rate, and n is the number of months. Which of the following gives P in terms of m, r, and n?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) P=r(1+r)nm(1+r)n\u22121",
          "B) P=(1+r)n\u22121m(1+r)n",
          "C) P=r(1+r)nm(1+r)n\u2212m",
          "D) P=(1+r)n\u22121mr(1+r)n"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_246",
    text: "If ba =2, what is the value of a4b ?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) 1",
          "C) 2",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_247",
    text: "The scatterplot above shows the relationship between the number of hours that a group of students spent studying for a test and their scores on the test. Which of the following is the best interpretation of the y-intercept of the line of best fit?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficulty: "hard",
    options: [
          "A) The predicted score of a student who studied for 0 hours.",
          "B) The predicted score of a student who studied for 10 hours.",
          "C) The predicted increase in score for each additional hour of study.",
          "D) The predicted number of hours of study for a student who scored 0."
    ],
    correctAnswer: "A",
    visual: "A scatterplot with \"Hours of Study\" on the x-axis and \"Test Score\" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.",
    visualElement: {
      type: 'graph',
      description: 'Scatterplot with study hours vs test scores',
      data: {
        xRange: [0, 12],
        yRange: [40, 100],
        points: [
          { x: 1, y: 62 },
          { x: 2, y: 65 },
          { x: 3, y: 68 },
          { x: 4, y: 71 },
          { x: 5, y: 74 },
          { x: 6, y: 77 },
          { x: 7, y: 80 },
          { x: 8, y: 83 },
          { x: 9, y: 86 },
          { x: 10, y: 89 }
        ],
        lines: [
          { points: [[0, 60], [10, 90]], color: '#f59e0b', style: 'dashed' }
        ],
        xLabel: 'Hours of Study',
        yLabel: 'Test Score'
      }
    },
    source: "College Board"
  },
  {
    id: "math_248",
    text: "A survey was conducted among a random sample of 250 students at a high school. The survey found that 175 students have a driver's license. If the high school has 1,200 students, which of the following is the most reasonable estimate for the number of students at the high school who have a driver's license?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "hard",
    options: [
          "A) 70",
          "B) 175",
          "C) 840",
          "D) 1025"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_249",
    text: "The table above shows the number of people in a survey who own a car and the number of people who own a bicycle. Based on the table, what is the probability that a person chosen at random owns a car, given that the person owns a bicycle?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 15/23",
          "B) 15/27",
          "C) 23/40",
          "D) 27/40"
    ],
    correctAnswer: "A",
    visual: "A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.",
    visualElement: {
      type: 'table',
      description: 'Venn diagram data table',
      data: {
          "headers": [
              "Category",
              "Count"
          ],
          "rows": [
              [
                  "Car only",
                  "12"
              ],
              [
                  "Bicycle only",
                  "8"
              ],
              [
                  "Both car and bicycle",
                  "15"
              ],
              [
                  "Neither",
                  "5"
              ]
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_250",
    text: "The graph of a line in the xy-plane passes through the point (1,4) and crosses the x-axis at the point (2,0). The line crosses the y-axis at the point (0,b). What is the value of b?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) 0",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_251",
    text: "In the xy-plane, the graph of the equation y=x2\u22128x+12 is a parabola. What is the distance between the x-intercepts of the parabola?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 4",
          "C) 6",
          "D) 8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_252",
    text: "The equation x2+y2\u22126x+8y=144 defines a circle in the xy-plane. What is the radius of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 13",
          "D) 144"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_253",
    text: "In the xy-plane, the graph of y=3x2\u221214x intersects the graph of y=x at the points (0,0) and (a,a). What is the value of a?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 4",
          "C) 5",
          "D) 6"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_254",
    text: "The number of radians in a 720-degree angle can be written as k\u03c0, where k is a constant. What is the value of k?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 2",
          "B) 4",
          "C) 6",
          "D) 8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_255",
    text: "A right triangle has sides of length x, y, and z, where z is the hypotenuse. If the perimeter of the triangle is 30 and the area is 30, what is the value of z?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 13",
          "D) 15"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_256",
    text: "In the xy-plane, the graph of the function f(x)=x2+5x+4 has two x-intercepts. What is the distance between the x-intercepts?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) 1",
          "B) 2",
          "C) 3",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_257",
    text: "A right circular cone has a height of 12 and a radius of 5. What is the volume of the cone?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 25\u03c0",
          "B) 100\u03c0",
          "C) 300\u03c0",
          "D) 400\u03c0"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_258",
    text: "In the xy-plane, the point (3,6) lies on the graph of the function f(x)=3x2\u2212bx+12. What is the value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -3",
          "B) 3",
          "C) 9",
          "D) 15"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_259",
    text: "The equation of a circle in the xy-plane is shown above. What is the radius of the circle? x2+y2\u22126x+8y=144",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) 5",
          "B) 12",
          "C) 13",
          "D) 144"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_260",
    text: "The expression x+35x\u22122 is equivalent to which of the following?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 5\u221232",
          "B) 5\u2212x+317",
          "C) 5\u2212x+32",
          "D) 1+3/x5\u22122/x"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "math_261",
    text: "The table above shows the distribution of age and gender for 25 people who entered a contest. If the contest winner is selected at random, what is the probability that the winner will be either a female under age 40 or a male age 40 or older?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 4/25",
          "B) 10/25",
          "C) 14/25",
          "D) 16/25"
    ],
    correctAnswer: "B",
    visual: "A table with columns for Male and Female, and rows for Under age 40 and Age 40 or older. The data is: Male Under 40: 8, Female Under 40: 8, Male 40 or older: 2, Female 40 or older: 7.",
    visualElement: {
      type: 'table',
      description: 'Demographics table by age and gender',
      data: {
        headers: ['', 'Male', 'Female'],
        rows: [
          ['Under age 40', '8', '8'],
          ['Age 40 or older', '2', '7']
        ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_262",
    text: "The graph of a line in the xy-plane has slope 2 and contains the point (1, 8). The graph of a second line passes through the points (1, 2) and (2, 1). If the two lines intersect at the point (a, b), what is the value of a+b?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) 4",
          "B) 1",
          "C) -1",
          "D) -4"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_263",
    text: "Which of the following equations has a graph in the xy-plane for which y is always greater than or equal to -1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) y=\u2223x\u2223\u22122",
          "B) y=x2\u22122",
          "C) y=(x\u22122)2",
          "D) y=x3\u22122"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_264",
    text: "Which of the following complex numbers is equivalent to 8+2i3\u22125i ? (Note: i=\u22121 )",
    category: "math",
    domain: "Additional Topics in Math",
    skill: "Complex numbers",
    difficulty: "hard",
    options: [
          "A) 347 \u22123423i",
          "B) 347 +3423i",
          "C) 6814 \u22126846i",
          "D) 6814 +6846i"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_265",
    text: "A website-hosting service charges businesses a onetime setup fee of $350 plus d dollars for each month. If a business owner paid $1,010 for the first 12 months, including the setup fee, what is the value of d?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
          "A) 25",
          "B) 35",
          "C) 45",
          "D) 55"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "math_266",
    text: "2x(3x+5)+3(3x+5)=ax2+bx+c. In the equation above, a, b, and c are constants. If the equation is true for all values of x, what is the value of b?",
    category: "math",
    domain: "Advanced Math",
    skill: "Equivalent expressions",
    difficulty: "hard",
    options: [
          "A) 8",
          "B) 16",
          "C) 19",
          "D) 31"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_267",
    text: "A circle in the xy-plane has center (5, -12) and radius 8. Which of the following is an equation of the circle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
          "A) (x\u22125)2+(y+12)2=64",
          "B) (x+5)2+(y\u221212)2=64",
          "C) (x\u22125)2+(y+12)2=8",
          "D) (x+5)2+(y\u221212)2=8"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_268",
    text: "In the figure above, triangle ABC is similar to triangle DEF. What is the value of cos(E)?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Right triangles and trigonometry",
    difficulty: "hard",
    options: [
          "A) 12/13",
          "B) 5/13",
          "C) 12/5",
          "D) 5/12"
    ],
    correctAnswer: "B",
    visual: "A right triangle ABC with right angle at B. AB=12, BC=5, AC=13.",
    visualElement: {
      type: 'diagram',
      description: 'Right triangle with labeled sides',
      svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">B</text><text x="145" y="50">C</text><text x="75" y="135">12</text><text x="150" y="100">5</text><text x="70" y="95">13</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_269",
    text: "A dairy farmer uses a storage silo that is in the shape of the right circular cylinder above. If the volume of the silo is 72pi cubic yards, what is the diameter of the base of the cylinder, in yards?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area and volume",
    difficulty: "hard",
    options: [
          "A) 3",
          "B) 6",
          "C) 9",
          "D) 12"
    ],
    correctAnswer: "B",
    visual: "A right circular cylinder with a height of 8 yards.",
    visualElement: {
      type: 'diagram',
      description: '3D cylinder with height labeled',
      svg: '<svg width="150" height="200" viewBox="0 0 150 200"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="75" cy="40" rx="35" ry="10"/><rect x="40" y="40" width="70" height="120" fill="#e5e7eb"/><ellipse cx="75" cy="160" rx="35" ry="10"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="120" y="105">8 yd</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="110" y1="40" x2="130" y2="40"/><line x1="110" y1="160" x2="130" y2="160"/></g></svg>'
    },
    source: "College Board"
  },
  {
    id: "math_270",
    text: "For what value of x is the function h(x) = 1?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
          "A) -1",
          "B) 0",
          "C) 1",
          "D) 2"
    ],
    correctAnswer: "D",
    visual: "A graph of a function h(x) is shown. It passes through the points (-1, -2), (0, -1), (1, 0), (2, 1), (3, 2).",
    visualElement: {
      type: 'graph',
      description: 'Linear function graph',
      data: {
          "xRange": [
              -2,
              4
          ],
          "yRange": [
              -3,
              3
          ],
          "lines": [
              {
                  "points": [
                      [
                          -1,
                          -2
                      ],
                      [
                          0,
                          -1
                      ],
                      [
                          1,
                          0
                      ],
                      [
                          2,
                          1
                      ],
                      [
                          3,
                          2
                      ]
                  ],
                  "color": "#2563eb"
              }
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_271",
    text: "The formula for the monthly payment, m, on a loan is given by the formula m=(1+r)n\u22121Pr(1+r)n , where P is the principal, r is the monthly interest rate, and n is the number of months. Which of the following gives P in terms of m, r, and n?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear equations in one variable and systems of equations in two variables",
    difficulty: "hard",
    options: [
          "A) P=r(1+r)nm(1+r)n\u22121",
          "B) P=(1+r)n\u22121m(1+r)n",
          "C) P=r(1+r)nm(1+r)n\u2212m",
          "D) P=(1+r)n\u22121mr(1+r)n"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "math_272",
    text: "If ba =2, what is the value of a4b ?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios, rates, proportional relationships, and units",
    difficulty: "hard",
    options: [
          "A) 0",
          "B) 1",
          "C) 2",
          "D) 4"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_273",
    text: "The scatterplot above shows the relationship between the number of hours that a group of students spent studying for a test and their scores on the test. Which of the following is the best interpretation of the y-intercept of the line of best fit?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Two-variable data: Models and scatterplots",
    difficulty: "hard",
    options: [
          "A) The predicted score of a student who studied for 0 hours.",
          "B) The predicted score of a student who studied for 10 hours.",
          "C) The predicted increase in score for each additional hour of study.",
          "D) The predicted number of hours of study for a student who scored 0."
    ],
    correctAnswer: "A",
    visual: "A scatterplot with \"Hours of Study\" on the x-axis and \"Test Score\" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.",
    visualElement: {
      type: 'graph',
      description: 'Scatterplot with study hours vs test scores',
      data: {
        xRange: [0, 12],
        yRange: [40, 100],
        points: [
          { x: 1, y: 62 },
          { x: 2, y: 65 },
          { x: 3, y: 68 },
          { x: 4, y: 71 },
          { x: 5, y: 74 },
          { x: 6, y: 77 },
          { x: 7, y: 80 },
          { x: 8, y: 83 },
          { x: 9, y: 86 },
          { x: 10, y: 89 }
        ],
        lines: [
          { points: [[0, 60], [10, 90]], color: '#f59e0b', style: 'dashed' }
        ],
        xLabel: 'Hours of Study',
        yLabel: 'Test Score'
      }
    },
    source: "College Board"
  },
  {
    id: "math_274",
    text: "A survey was conducted among a random sample of 250 students at a high school. The survey found that 175 students have a driver's license. If the high school has 1,200 students, which of the following is the most reasonable estimate for the number of students at the high school who have a driver's license?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Inference from sample statistics and margin of error",
    difficulty: "hard",
    options: [
          "A) 70",
          "B) 175",
          "C) 840",
          "D) 1025"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "math_275",
    text: "The table above shows the number of people in a survey who own a car and the number of people who own a bicycle. Based on the table, what is the probability that a person chosen at random owns a car, given that the person owns a bicycle?",
    category: "math",
    domain: "Problem-Solving and Data Analysis",
    skill: "Probability and conditional probability",
    difficulty: "hard",
    options: [
          "A) 15/23",
          "B) 15/27",
          "C) 23/40",
          "D) 27/40"
    ],
    correctAnswer: "A",
    visual: "A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.",
    visualElement: {
      type: 'table',
      description: 'Venn diagram data table',
      data: {
          "headers": [
              "Category",
              "Count"
          ],
          "rows": [
              [
                  "Car only",
                  "12"
              ],
              [
                  "Bicycle only",
                  "8"
              ],
              [
                  "Both car and bicycle",
                  "15"
              ],
              [
                  "Neither",
                  "5"
              ]
          ]
      }
    },
    source: "College Board"
  },
  {
    id: "math_276",
    text: "The graph of a line in the xy-plane passes through the point (1,4) and crosses the x-axis at the point (2,0). The line crosses the y-axis at the point (0,b). What is the value of b?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
          "A) -4",
          "B) 0",
          "C) 4",
          "D) 8"
    ],
    correctAnswer: "D",
    source: "College Board"
  }
]);

// Export by domain for easier filtering
export const algebraQuestions = mathQuestions.filter(q => q.domain === 'Algebra');
export const geometryQuestions = mathQuestions.filter(q => q.domain === 'Geometry and Trigonometry');
export const advancedMathQuestions = mathQuestions.filter(q => q.domain === 'Advanced Math');
export const dataAnalysisQuestions = mathQuestions.filter(q => q.domain === 'Problem-Solving and Data Analysis');

// Statistics
export const questionStats = {
  total: mathQuestions.length,
  byDomain: {
    algebra: algebraQuestions.length,
    geometry: geometryQuestions.length,
    advancedMath: advancedMathQuestions.length,
    dataAnalysis: dataAnalysisQuestions.length
  },
  byDifficulty: {
    easy: mathQuestions.filter(q => q.difficulty === 'easy').length,
    medium: mathQuestions.filter(q => q.difficulty === 'medium').length,
    hard: mathQuestions.filter(q => q.difficulty === 'hard').length
  }
};

export default mathQuestions;
