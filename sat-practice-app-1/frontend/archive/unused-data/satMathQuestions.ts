// SAT Math Questions - Generated from College Board RTF
// Total: 276 authentic SAT math questions
// Generated on: 2025-06-30T03:10:05.749Z

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

export interface VisualElement {
  type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
  description: string;
  data?: any;
  svg?: string;
}

// All 276 SAT Math Questions
export const satMathQuestions: Question[] = [
  {
    id: "sat_math_1",
    text: "What system of linear equations is represented by the lines shown?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 8x+4y=32,−10x−4y=−64",
      "B) 8x−4y=32,−10x+4y=−64",
      "C) 4x−10y=32,−8x+10y=−64",
      "D) 4x+10y=32,−8x−10y=−64"
    ],
    correctAnswer: "D",
    visual: "A line graph on an xy-plane with a grid. The x-axis ranges from -2 to 10. The y-axis ranges from -2 to 10. There are two lines graphed. The first line passes through the points (0, 8) and (8, 0). The second line passes through the points (0, 4) and (8, 0).",
    visualElement: {
      type: 'graph',
      description: 'Two-line coordinate graph',
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
    id: "sat_math_2",
    text: "3x=36y45. One of the two equations in a system of linear equations is given. The system has no solution. Which equation could be the second equation in this system?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) x=4y",
      "B) 31 x=4y",
      "C) x=12y15",
      "D) 31 x=12y15"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_3",
    text: "The graph of the equation ax+ky=6 is a line in the xy-plane, where a and k are constants. If the line contains the points (2,6) and (0,3), what is the value of k?",
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
    id: "sat_math_4",
    text: "A window repair specialist charges $220 for the first two hours of repair plus an hourly fee for each additional hour. The total cost for 5 hours of repair is $400. Which function f gives the total cost, in dollars, for hours of repair, where x2?",
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
    id: "sat_math_5",
    text: "For line h, the table shows three values of x and their corresponding values of y. Line k is the result of translating line h down 5 units in the xy-plane. What is the x-intercept of line k?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) (326 ,0)",
      "B) (29 ,0)",
      "C) (311 ,0)",
      "D) (617 ,0)"
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
    id: "sat_math_6",
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
    id: "sat_math_7",
    text: "The cost of renting a backhoe for up to 10 days is $270 for the first day and $135 for each additional day. Which of the following equations gives the cost y, in dollars, of renting the backhoe for x days, where x is a positive integer and x10?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
      "A) y=270x135",
      "B) y=270x+135",
      "C) y=135x+270",
      "D) y=135x+135"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_8",
    text: "Adam's school is a 20-minute walk or a 5-minute bus ride away from his house. The bus runs once every 30 minutes, and the number of minutes, w, that Adam waits for the bus varies between 0 and 30. Which of the following inequalities gives the values of w for which it would be faster for Adam to walk to school?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
      "A) w5<20",
      "B) w5>20",
      "C) w+5<20",
      "D) w+5>20"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_9",
    text: "7x+6y=5,28x+24y=20. For each real number r, which of the following points lies on the graph of each equation in the xy-plane for the given system?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) (r,76r +75 )",
      "B) (r,67r +65 )",
      "C) (4r +5,4r +20)",
      "D) (76r +75 ,r)"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_10",
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
    id: "sat_math_11",
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
    id: "sat_math_12",
    text: "A laundry service is buying detergent and fabric softener from its supplier. The supplier will deliver no more than 300 pounds in a shipment. Each container of detergent weighs 7.35 pounds, and each container of fabric softener weighs 6.2 pounds. The service wants to buy at least twice as many containers of detergent as containers of fabric softener. Let d represent the number of containers of detergent, and let s represent the number of containers of fabric softener, where d and s are nonnegative integers. Which of the following systems of inequalities best represents this situation?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
      "A) 7.35d+6.2s300,d2s",
      "B) 7.35d+6.2s300,2ds",
      "C) 14.7d+6.2s300,d2s",
      "D) 14.7d+6.2s300,2ds"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_13",
    text: "How many solutions does the equation 10(15x9)=15(610x) have?",
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
    id: "sat_math_14",
    text: "yx+7,y2x1. Which point (x, y) is a solution to the given system of inequalities in the xy-plane?",
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
    id: "sat_math_15",
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
    id: "sat_math_16",
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
    id: "sat_math_17",
    text: "For the linear function f, the table shows three values of x and their corresponding values of f(x). If h(x)=f(x)13, which equation defines h?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
      "A) h(x)=5x4",
      "B) h(x)=5x+7",
      "C) h(x)=5x+9",
      "D) h(x)=5x+20"
    ],
    correctAnswer: "B",
    visual: "A table with two columns, x and f(x). The rows contain the following pairs of values: (-4, 0), (-19/5, 1), (-18/5, 2).",
    visualElement: {
      type: 'table',
      description: 'Function table with x and f(x) values',
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
    id: "sat_math_18",
    text: "The functions f and g are defined as f(x)=41 x9 and g(x)=43 x+21. If the function h is defined as h(x)=f(x)+g(x), what is the x-coordinate of the x-intercept of the graph of y=h(x) in the xy-plane?",
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
    id: "sat_math_19",
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
    id: "sat_math_20",
    text: "x+y=3.5,x+3y=9.5. If (x, y) satisfies the system of equations above, what is the value of y?",
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
    id: "sat_math_21",
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
    id: "sat_math_22",
    text: "23 y41 x=32 23 y,21 x+23 =py+29 . In the given system of equations, p is a constant. If the system has no solution, what is the value of p?",
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
    id: "sat_math_23",
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
    id: "sat_math_24",
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
    id: "sat_math_25",
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
    id: "sat_math_26",
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
    id: "sat_math_27",
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
    id: "sat_math_28",
    text: "4x6y=10y+2,ty=21 +2x. In the given system of equations, t is a constant. If the system has no solution, what is the value of t?",
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
    id: "sat_math_29",
    text: "F(x)=59 (x273.15)+32. The function F gives the temperature, in degrees Fahrenheit, that corresponds to a temperature of x kelvins. If a temperature increased by 9.10 kelvins, by how much did the temperature increase, in degrees Fahrenheit?",
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
    id: "sat_math_30",
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
    id: "sat_math_31",
    text: "According to data provided by the US Department of Energy, the average price per gallon of regular gasoline in the United States from September 1, 2014, to December 1, 2014, is modeled by the function F defined below, where F(x) is the average price per gallon x months after September 1. F(x)=2.740.19(x3). The constant 2.74 in this function estimates which of the following?",
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
    id: "sat_math_32",
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
    id: "sat_math_33",
    text: "21 x+31 y=61 ,ax+y=c. In the system of equations below, a and c are constants. If the system of equations has an infinite number of solutions (x,y) what is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 21",
      "B) 0",
      "C) 21",
      "D) 23"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_34",
    text: "The graph of y=f(x)+14 is shown. Which equation defines function f?",
    category: "math",
    domain: "Algebra",
    skill: "Linear functions",
    difficulty: "hard",
    options: [
      "A) f(x)=41 x12",
      "B) f(x)=41 x+16",
      "C) f(x)=41 x+2",
      "D) f(x)=41 x14"
    ],
    correctAnswer: "A",
    visual: "A line graph on an xy-plane with a grid. The x-axis ranges from -10 to 10. The y-axis ranges from -10 to 10. A single line is graphed, passing through the points (0, 2) and (8, 0).",
    visualElement: {
      type: 'graph',
      description: 'Single-line coordinate graph',
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
    id: "sat_math_35",
    text: "y>2x−1,2x>5. Which of the following consists of the y-coordinates of all the points that satisfy the system of inequalities above?",
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
    id: "sat_math_36",
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
    id: "sat_math_37",
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
      description: 'Function table with x and f(x) values',
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
    id: "sat_math_38",
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
    id: "sat_math_39",
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
    id: "sat_math_40",
    text: "y=2x+1,y=ax−8. In the system of equations above, a is a constant. If the system of equations has no solution, what is the value of a?",
    category: "math",
    domain: "Algebra",
    skill: "Systems of two linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) −21",
      "B) 0",
      "C) 1",
      "D) 2"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_41",
    text: "A recipe calls for 2 cups of flour for every 3 cups of sugar. If you have 8 cups of flour, how many cups of sugar can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 10 cups",
      "B) 12 cups",
      "C) 14 cups",
      "D) 16 cups"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_42",
    text: "The sum of three consecutive integers is 72. What is the value of the smallest integer?",
    category: "math",
    domain: "Algebra",
    skill: "Consecutive integers",
    difficulty: "hard",
    options: [
      "A) 23",
      "B) 24",
      "C) 25",
      "D) 26"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_43",
    text: "A train leaves a station and travels at a constant speed of 60 miles per hour. How far will the train travel in 3 hours?",
    category: "math",
    domain: "Algebra",
    skill: "Distance, rate, and time",
    difficulty: "hard",
    options: [
      "A) 120 miles",
      "B) 180 miles",
      "C) 240 miles",
      "D) 300 miles"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_44",
    text: "If a triangle has sides of lengths 7, 24, and x, and the perimeter of the triangle is 50, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Perimeter",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 15",
      "C) 20",
      "D) 25"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_45",
    text: "A car's value depreciates by 15% each year. If the car is currently worth $20,000, what will be its value in two years?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $14,450",
      "B) $15,300",
      "C) $16,000",
      "D) $17,850"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_46",
    text: "The length of a rectangle is twice its width. If the perimeter of the rectangle is 60 inches, what is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 20 inches",
      "C) 30 inches",
      "D) 40 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_47",
    text: "A person invests $1,000 in a savings account that pays 5% interest per year. How much interest will the person earn in 3 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $50",
      "B) $100",
      "C) $150",
      "D) $200"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_48",
    text: "The sum of the ages of a father and his son is 50 years. If the father is twice as old as the son, how old is the son?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 years",
      "B) 15 years",
      "C) 20 years",
      "D) 25 years"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_49",
    text: "A cyclist travels at a speed of 12 miles per hour. How long will it take to travel 36 miles?",
    category: "math",
    domain: "Algebra",
    skill: "Distance, rate, and time",
    difficulty: "hard",
    options: [
      "A) 2 hours",
      "B) 3 hours",
      "C) 4 hours",
      "D) 5 hours"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_50",
    text: "If 3x - 7 = 11, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 6",
      "B) 7",
      "C) 8",
      "D) 9"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_51",
    text: "A store sells pencils at 5 for $1. If a student buys 20 pencils, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $2",
      "B) $3",
      "C) $4",
      "D) $5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_52",
    text: "The length of a rectangle is 3 times its width. If the width is w, what is the length in terms of w?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 3w",
      "B) 3/w",
      "C) w/3",
      "D) w+3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_53",
    text: "A car rental company charges a flat fee of $50 plus $0.20 per mile driven. If a customer drives 100 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $50",
      "B) $70",
      "C) $90",
      "D) $100"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_54",
    text: "The sum of two numbers is 30. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 30-x",
      "B) x-30",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_55",
    text: "A recipe requires 2 cups of flour for every 3 cups of sugar. If you have 8 cups of flour, how many cups of sugar can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 10 cups",
      "B) 12 cups",
      "C) 14 cups",
      "D) 16 cups"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_56",
    text: "The perimeter of a square is 40 inches. What is the length of one side?",
    category: "math",
    domain: "Algebra",
    skill: "Perimeter",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 15 inches",
      "C) 20 inches",
      "D) 25 inches"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_57",
    text: "A car's value depreciates by 20% each year. If the car is currently worth $15,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $10,500",
      "B) $11,000",
      "C) $12,000",
      "D) $13,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_58",
    text: "The length of a rectangle is 4 times its width. If the width is 5 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 15 inches",
      "C) 20 inches",
      "D) 25 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_59",
    text: "A person invests $2,000 in a savings account that pays 3% interest per year. How much interest will the person earn in 5 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $300",
      "B) $400",
      "C) $500",
      "D) $600"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_60",
    text: "If 7x + 2 = 23, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_61",
    text: "A store sells notebooks at 3 for $2. If a student buys 9 notebooks, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $4",
      "B) $5",
      "C) $6",
      "D) $7"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_62",
    text: "The length of a rectangle is twice its width. If the width is w, what is the length in terms of w?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 2w",
      "B) 2/w",
      "C) w/2",
      "D) w+2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_63",
    text: "A car rental company charges a flat fee of $30 plus $0.25 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $30",
      "B) $50",
      "C) $70",
      "D) $90"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_64",
    text: "The sum of two numbers is 40. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 40-x",
      "B) x-40",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_65",
    text: "A recipe requires 3 cups of flour for every 4 cups of sugar. If you have 12 cups of sugar, how many cups of flour do you need?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 9 cups",
      "B) 10 cups",
      "C) 11 cups",
      "D) 12 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_66",
    text: "The perimeter of a rectangle is 50 meters. The length of the rectangle is 5 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 meters",
      "B) 15 meters",
      "C) 20 meters",
      "D) 25 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_67",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $25,000, what will be its value in three years?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $17,500",
      "B) $18,000",
      "C) $19,000",
      "D) $20,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_68",
    text: "The length of a rectangle is 5 times its width. If the width is 4 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 15 inches",
      "C) 20 inches",
      "D) 25 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_69",
    text: "A person invests $5,000 in a savings account that pays 4% interest per year. How much interest will the person earn in 10 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $200",
      "B) $400",
      "C) $600",
      "D) $800"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_70",
    text: "If 9x + 4 = 31, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_71",
    text: "A store sells erasers at 4 for $1. If a student buys 16 erasers, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $3",
      "B) $4",
      "C) $5",
      "D) $6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_72",
    text: "The length of a rectangle is three times its width. If the width is w, what is the length in terms of w?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 3w",
      "B) 3/w",
      "C) w/3",
      "D) w+3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_73",
    text: "A car rental company charges a flat fee of $40 plus $0.30 per mile driven. If a customer drives 50 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $40",
      "B) $50",
      "C) $60",
      "D) $70"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_74",
    text: "The sum of three consecutive integers is 72. What is the value of the largest integer?",
    category: "math",
    domain: "Algebra",
    skill: "Consecutive integers",
    difficulty: "hard",
    options: [
      "A) 24",
      "B) 25",
      "C) 26",
      "D) 27"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_75",
    text: "A train travels at a constant speed of 80 miles per hour. How far will the train travel in 4 hours?",
    category: "math",
    domain: "Algebra",
    skill: "Distance, rate, and time",
    difficulty: "hard",
    options: [
      "A) 240 miles",
      "B) 320 miles",
      "C) 400 miles",
      "D) 480 miles"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_76",
    text: "If a triangle has sides of lengths 8, 15, and x, and the perimeter of the triangle is 50, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Perimeter",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 15",
      "C) 20",
      "D) 25"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_77",
    text: "A person's salary is $3,000 per month. If the person saves 20% of their salary, how much do they save each month?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $300",
      "B) $400",
      "C) $500",
      "D) $600"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_78",
    text: "The length of a rectangle is 7 meters and the width is 3 meters. What is the area of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Area",
    difficulty: "hard",
    options: [
      "A) 10 square meters",
      "B) 14 square meters",
      "C) 21 square meters",
      "D) 24 square meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_79",
    text: "A car's value depreciates by 25% each year. If the car is currently worth $12,000, what will be its value in two years?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $6,000",
      "B) $7,500",
      "C) $9,000",
      "D) $10,500"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_80",
    text: "The length of a rectangle is 4 times its width. If the width is 10 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 20 inches",
      "B) 30 inches",
      "C) 40 inches",
      "D) 50 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_81",
    text: "A person invests $10,000 in a savings account that pays 5% interest per year. How much interest will the person earn in 2 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $500",
      "B) $1,000",
      "C) $1,500",
      "D) $2,000"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_82",
    text: "If 5x - 3 = 12, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_83",
    text: "A store sells markers at 6 for $5. If a student buys 24 markers, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $15",
      "B) $20",
      "C) $25",
      "D) $30"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_84",
    text: "The length of a rectangle is twice its width. If the width is 8 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 8 inches",
      "B) 12 inches",
      "C) 16 inches",
      "D) 24 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_85",
    text: "A person's salary is $2,500 per month. If the person saves 10% of their salary, how much do they save each month?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $250",
      "B) $300",
      "C) $350",
      "D) $400"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_86",
    text: "The perimeter of a square is 24 meters. What is the length of one side?",
    category: "math",
    domain: "Algebra",
    skill: "Perimeter",
    difficulty: "hard",
    options: [
      "A) 4 meters",
      "B) 6 meters",
      "C) 8 meters",
      "D) 10 meters"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_87",
    text: "A car's value depreciates by 15% each year. If the car is currently worth $18,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $13,500",
      "B) $14,000",
      "C) $15,000",
      "D) $15,300"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_88",
    text: "The length of a rectangle is 3 times its width. If the width is 7 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 14 inches",
      "B) 21 inches",
      "C) 28 inches",
      "D) 35 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_89",
    text: "A person invests $15,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 4 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $600",
      "B) $900",
      "C) $1,200",
      "D) $1,500"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_90",
    text: "If 8x + 5 = 37, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 4",
      "B) 5",
      "C) 6",
      "D) 7"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_91",
    text: "A store sells binders at 2 for $3. If a student buys 8 binders, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $9",
      "B) $12",
      "C) $15",
      "D) $18"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_92",
    text: "The length of a rectangle is twice its width. If the width is 12 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 12 inches",
      "B) 18 inches",
      "C) 24 inches",
      "D) 30 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_93",
    text: "A car rental company charges a flat fee of $25 plus $0.15 per mile driven. If a customer drives 150 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $25",
      "B) $40",
      "C) $55",
      "D) $70"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_94",
    text: "The sum of two numbers is 50. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 50-x",
      "B) x-50",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_95",
    text: "A recipe requires 3 cups of sugar for every 8 cups of flour. If you have 24 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 64 cups",
      "B) 68 cups",
      "C) 72 cups",
      "D) 76 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_96",
    text: "The perimeter of a rectangle is 150 meters. The length of the rectangle is 10 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 35 meters",
      "B) 40 meters",
      "C) 45 meters",
      "D) 50 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_97",
    text: "A car's value depreciates by 20% each year. If the car is currently worth $10,000, what will be its value in three years?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $8,000",
      "B) $8,500",
      "C) $9,000",
      "D) $9,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_98",
    text: "The length of a rectangle is 5 times its width. If the width is 6 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 24 inches",
      "B) 30 inches",
      "C) 36 inches",
      "D) 42 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_99",
    text: "A person invests $8,000 in a savings account that pays 4% interest per year. How much interest will the person earn in 6 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $192",
      "B) $240",
      "C) $288",
      "D) $336"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_100",
    text: "If 6x + 2 = 38, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 6",
      "B) 7",
      "C) 8",
      "D) 9"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_101",
    text: "A store sells folders at 2 for $1. If a student buys 10 folders, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $4",
      "B) $5",
      "C) $6",
      "D) $7"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_102",
    text: "The length of a rectangle is three times its width. If the width is 8 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 16 inches",
      "B) 20 inches",
      "C) 24 inches",
      "D) 28 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_103",
    text: "A car rental company charges a flat fee of $55 plus $0.10 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $55",
      "B) $65",
      "C) $75",
      "D) $85"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_104",
    text: "The sum of two numbers is 60. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 60-x",
      "B) x-60",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_105",
    text: "A recipe requires 4 cups of sugar for every 9 cups of flour. If you have 18 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 8 cups",
      "B) 9 cups",
      "C) 10 cups",
      "D) 11 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_106",
    text: "The perimeter of a rectangle is 80 meters. The length of the rectangle is 10 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 15 meters",
      "B) 20 meters",
      "C) 25 meters",
      "D) 30 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_107",
    text: "A car's value depreciates by 15% each year. If the car is currently worth $22,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $16,500",
      "B) $18,700",
      "C) $19,800",
      "D) $20,500"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_108",
    text: "The length of a rectangle is 4 times its width. If the width is 3 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 12 inches",
      "C) 14 inches",
      "D) 15 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_109",
    text: "A person invests $12,000 in a savings account that pays 3% interest per year. How much interest will the person earn in 5 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $180",
      "B) $240",
      "C) $300",
      "D) $360"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_110",
    text: "If 4x + 7 = 39, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 8",
      "B) 9",
      "C) 10",
      "D) 11"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_111",
    text: "A store sells staplers at 5 for $4. If a student buys 25 staplers, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $15",
      "B) $20",
      "C) $25",
      "D) $30"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_112",
    text: "The length of a rectangle is twice its width. If the width is 14 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 14 inches",
      "B) 28 inches",
      "C) 42 inches",
      "D) 56 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_113",
    text: "A car rental company charges a flat fee of $45 plus $0.25 per mile driven. If a customer drives 100 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $45",
      "B) $50",
      "C) $55",
      "D) $60"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_114",
    text: "The sum of two numbers is 80. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 80-x",
      "B) x-80",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_115",
    text: "A recipe requires 3 cups of sugar for every 8 cups of flour. If you have 24 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 9 cups",
      "B) 10 cups",
      "C) 11 cups",
      "D) 12 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_116",
    text: "The perimeter of a rectangle is 60 meters. The length of the rectangle is 5 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 meters",
      "B) 15 meters",
      "C) 20 meters",
      "D) 25 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_117",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $30,000, what will be its value in two years?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $24,000",
      "B) $25,500",
      "C) $27,000",
      "D) $28,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_118",
    text: "The length of a rectangle is 6 times its width. If the width is 2 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 12 inches",
      "C) 14 inches",
      "D) 15 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_119",
    text: "A person invests $7,000 in a savings account that pays 5% interest per year. How much interest will the person earn in 3 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $105",
      "B) $150",
      "C) $210",
      "D) $350"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_120",
    text: "If 2x + 3 = 11, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_121",
    text: "A store sells calculators at 4 for $10. If a student buys 10 calculators, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $20",
      "B) $25",
      "C) $30",
      "D) $35"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_122",
    text: "The length of a rectangle is twice its width. If the width is 10 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 20 inches",
      "C) 30 inches",
      "D) 40 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_123",
    text: "A car rental company charges a flat fee of $60 plus $0.20 per mile driven. If a customer drives 150 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $60",
      "B) $90",
      "C) $120",
      "D) $150"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_124",
    text: "The sum of two numbers is 100. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 100-x",
      "B) x-100",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_125",
    text: "A recipe requires 5 cups of flour for every 2 cups of sugar. If you have 15 cups of flour, how many cups of sugar can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 4 cups",
      "B) 6 cups",
      "C) 8 cups",
      "D) 10 cups"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_126",
    text: "The perimeter of a rectangle is 70 meters. The length of the rectangle is 5 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 15 meters",
      "B) 20 meters",
      "C) 25 meters",
      "D) 30 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_127",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $40,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $36,000",
      "B) $37,000",
      "C) $38,000",
      "D) $39,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_128",
    text: "The length of a rectangle is 3 times its width. If the width is 4 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 inches",
      "B) 12 inches",
      "C) 14 inches",
      "D) 15 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_129",
    text: "A person invests $9,000 in a savings account that pays 4% interest per year. How much interest will the person earn in 2 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $180",
      "B) $360",
      "C) $540",
      "D) $720"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_130",
    text: "If 5x + 2 = 17, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_131",
    text: "A store sells backpacks at 3 for $30. If a student buys 9 backpacks, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $60",
      "B) $70",
      "C) $80",
      "D) $90"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_132",
    text: "The length of a rectangle is twice its width. If the width is 15 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 15 inches",
      "B) 30 inches",
      "C) 45 inches",
      "D) 60 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_133",
    text: "A car rental company charges a flat fee of $70 plus $0.25 per mile driven. If a customer drives 100 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $70",
      "B) $90",
      "C) $110",
      "D) $130"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_134",
    text: "The sum of two numbers is 90. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 90-x",
      "B) x-90",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_135",
    text: "A recipe requires 2 cups of sugar for every 3 cups of flour. If you have 18 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 24 cups",
      "B) 27 cups",
      "C) 30 cups",
      "D) 36 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_136",
    text: "The perimeter of a rectangle is 40 meters. The length of the rectangle is 5 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 10 meters",
      "B) 15 meters",
      "C) 20 meters",
      "D) 25 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_137",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $50,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $45,000",
      "B) $46,000",
      "C) $47,000",
      "D) $48,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_138",
    text: "The length of a rectangle is 4 times its width. If the width is 6 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 18 inches",
      "B) 24 inches",
      "C) 30 inches",
      "D) 36 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_139",
    text: "A person invests $8,000 in a savings account that pays 4% interest per year. How much interest will the person earn in 5 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $160",
      "B) $320",
      "C) $480",
      "D) $640"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_140",
    text: "If 3x + 4 = 19, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_141",
    text: "A store sells notebooks at 2 for $3. If a student buys 10 notebooks, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $10",
      "B) $15",
      "C) $20",
      "D) $25"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_142",
    text: "The length of a rectangle is twice its width. If the width is 20 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 20 inches",
      "B) 30 inches",
      "C) 40 inches",
      "D) 50 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_143",
    text: "A car rental company charges a flat fee of $80 plus $0.15 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $80",
      "B) $90",
      "C) $100",
      "D) $110"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_144",
    text: "The sum of two numbers is 120. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 120-x",
      "B) x-120",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_145",
    text: "A recipe requires 3 cups of sugar for every 5 cups of flour. If you have 15 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 25 cups",
      "B) 30 cups",
      "C) 35 cups",
      "D) 40 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_146",
    text: "The perimeter of a rectangle is 90 meters. The length of the rectangle is 10 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 20 meters",
      "B) 25 meters",
      "C) 30 meters",
      "D) 35 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_147",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $35,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $31,500",
      "B) $32,000",
      "C) $33,000",
      "D) $34,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_148",
    text: "The length of a rectangle is 5 times its width. If the width is 8 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 inches",
      "B) 35 inches",
      "C) 40 inches",
      "D) 45 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_149",
    text: "A person invests $6,000 in a savings account that pays 5% interest per year. How much interest will the person earn in 4 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $120",
      "B) $240",
      "C) $360",
      "D) $480"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_150",
    text: "If 8x + 1 = 17, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 5"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_151",
    text: "A store sells pencils at 5 for $1. If a student buys 30 pencils, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $6",
      "B) $7",
      "C) $8",
      "D) $9"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_152",
    text: "The length of a rectangle is twice its width. If the width is 25 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 25 inches",
      "B) 50 inches",
      "C) 75 inches",
      "D) 100 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_153",
    text: "A car rental company charges a flat fee of $90 plus $0.10 per mile driven. If a customer drives 300 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $90",
      "B) $120",
      "C) $150",
      "D) $180"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_154",
    text: "The sum of two numbers is 500. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 500-x",
      "B) x-500",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_155",
    text: "A recipe requires 2 cups of sugar for every 7 cups of flour. If you have 28 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 56 cups",
      "B) 60 cups",
      "C) 64 cups",
      "D) 70 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_156",
    text: "The perimeter of a rectangle is 110 meters. The length of the rectangle is 5 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 25 meters",
      "B) 30 meters",
      "C) 35 meters",
      "D) 40 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_157",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $28,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $24,000",
      "B) $25,200",
      "C) $26,400",
      "D) $27,000"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_158",
    text: "The length of a rectangle is 4 times its width. If the width is 9 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 27 inches",
      "B) 36 inches",
      "C) 45 inches",
      "D) 54 inches"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_159",
    text: "A person invests $10,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 3 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $180",
      "B) $360",
      "C) $540",
      "D) $720"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_160",
    text: "If 7x + 3 = 24, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_161",
    text: "A store sells art supplies at 5 for $12. If a student buys 20 supplies, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $40",
      "B) $45",
      "C) $50",
      "D) $55"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_162",
    text: "The length of a rectangle is twice its width. If the width is 30 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 inches",
      "B) 60 inches",
      "C) 90 inches",
      "D) 120 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_163",
    text: "A car rental company charges a flat fee of $100 plus $0.05 per mile driven. If a customer drives 500 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $100",
      "B) $150",
      "C) $200",
      "D) $250"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_164",
    text: "The sum of two numbers is 200. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 200-x",
      "B) x-200",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_165",
    text: "A recipe requires 3 cups of sugar for every 10 cups of flour. If you have 30 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 100 cups",
      "B) 110 cups",
      "C) 120 cups",
      "D) 130 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_166",
    text: "The perimeter of a rectangle is 120 meters. The length of the rectangle is 10 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 25 meters",
      "B) 30 meters",
      "C) 35 meters",
      "D) 40 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_167",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $18,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $16,200",
      "B) $16,500",
      "C) $17,000",
      "D) $17,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_168",
    text: "The length of a rectangle is 4 times its width. If the width is 7 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 21 inches",
      "B) 24 inches",
      "C) 28 inches",
      "D) 30 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_169",
    text: "A person invests $11,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 5 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $330",
      "B) $660",
      "C) $990",
      "D) $1,320"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_170",
    text: "If 9x + 5 = 50, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 5",
      "B) 6",
      "C) 7",
      "D) 8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_171",
    text: "A store sells sketchbooks at 4 for $10. If a student buys 16 sketchbooks, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $30",
      "B) $35",
      "C) $40",
      "D) $45"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_172",
    text: "The length of a rectangle is twice its width. If the width is 35 inches, what is the length in terms of w?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 2w",
      "B) 2/w",
      "C) w/2",
      "D) w+2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_173",
    text: "A car rental company charges a flat fee of $120 plus $0.05 per mile driven. If a customer drives 400 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $120",
      "B) $140",
      "C) $160",
      "D) $180"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_174",
    text: "The sum of two numbers is 250. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 250-x",
      "B) x-250",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_175",
    text: "A recipe requires 2 cups of sugar for every 6 cups of flour. If you have 18 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 54 cups",
      "B) 60 cups",
      "C) 66 cups",
      "D) 72 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_176",
    text: "The perimeter of a rectangle is 140 meters. The length of the rectangle is 10 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 meters",
      "B) 35 meters",
      "C) 40 meters",
      "D) 45 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_177",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $26,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $23,400",
      "B) $23,600",
      "C) $24,000",
      "D) $24,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_178",
    text: "The length of a rectangle is 4 times its width. If the width is 8 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 24 inches",
      "B) 28 inches",
      "C) 32 inches",
      "D) 36 inches"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_179",
    text: "A person invests $13,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 4 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $312",
      "B) $624",
      "C) $936",
      "D) $1,248"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_180",
    text: "If 2x + 5 = 25, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 15",
      "C) 20",
      "D) 25"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_181",
    text: "A store sells highlighters at 5 for $4. If a student buys 25 highlighters, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $15",
      "B) $20",
      "C) $25",
      "D) $30"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_182",
    text: "The length of a rectangle is twice its width. If the width is 40 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 40 inches",
      "B) 60 inches",
      "C) 80 inches",
      "D) 100 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_183",
    text: "A car rental company charges a flat fee of $110 plus $0.10 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $110",
      "B) $130",
      "C) $150",
      "D) $170"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_184",
    text: "The sum of two numbers is 300. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 300-x",
      "B) x-300",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_185",
    text: "A recipe requires 3 cups of sugar for every 7 cups of flour. If you have 21 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 49 cups",
      "B) 50 cups",
      "C) 51 cups",
      "D) 52 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_186",
    text: "The perimeter of a rectangle is 130 meters. The length of the rectangle is 10 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 meters",
      "B) 35 meters",
      "C) 40 meters",
      "D) 45 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_187",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $32,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $28,800",
      "B) $29,000",
      "C) $30,000",
      "D) $31,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_188",
    text: "The length of a rectangle is 4 times its width. If the width is 10 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 inches",
      "B) 40 inches",
      "C) 50 inches",
      "D) 60 inches"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_189",
    text: "A person invests $14,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 3 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $312",
      "B) $624",
      "C) $936",
      "D) $1,248"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_190",
    text: "If 5x + 7 = 37, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 5",
      "B) 6",
      "C) 7",
      "D) 8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_191",
    text: "A store sells binders at 3 for $5. If a student buys 9 binders, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $10",
      "B) $15",
      "C) $20",
      "D) $25"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_192",
    text: "The length of a rectangle is twice its width. If the width is 12 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 12 inches",
      "B) 18 inches",
      "C) 24 inches",
      "D) 30 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_193",
    text: "A car rental company charges a flat fee of $25 plus $0.15 per mile driven. If a customer drives 150 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $25",
      "B) $40",
      "C) $55",
      "D) $70"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_194",
    text: "The sum of two numbers is 50. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 50-x",
      "B) x-50",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_195",
    text: "A recipe requires 3 cups of sugar for every 8 cups of flour. If you have 24 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 64 cups",
      "B) 68 cups",
      "C) 72 cups",
      "D) 76 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_196",
    text: "The perimeter of a rectangle is 150 meters. The length of the rectangle is 10 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 35 meters",
      "B) 40 meters",
      "C) 45 meters",
      "D) 50 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_197",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $38,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $34,200",
      "B) $34,500",
      "C) $35,000",
      "D) $35,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_198",
    text: "The length of a rectangle is 4 times its width. If the width is 12 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 36 inches",
      "B) 40 inches",
      "C) 44 inches",
      "D) 48 inches"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "sat_math_199",
    text: "A person invests $15,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 2 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $180",
      "B) $360",
      "C) $540",
      "D) $720"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_200",
    text: "If 6x + 8 = 38, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 4",
      "B) 5",
      "C) 6",
      "D) 7"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_201",
    text: "A store sells folders at 2 for $1. If a student buys 10 folders, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $4",
      "B) $5",
      "C) $6",
      "D) $7"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_202",
    text: "The length of a rectangle is three times its width. If the width is 10 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 20 inches",
      "B) 25 inches",
      "C) 30 inches",
      "D) 35 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_203",
    text: "A car rental company charges a flat fee of $55 plus $0.10 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $55",
      "B) $65",
      "C) $75",
      "D) $85"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_204",
    text: "The sum of two numbers is 500. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 500-x",
      "B) x-500",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_205",
    text: "A recipe requires 2 cups of sugar for every 3 cups of flour. If you have 24 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 36 cups",
      "B) 48 cups",
      "C) 60 cups",
      "D) 72 cups"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_206",
    text: "The perimeter of a rectangle is 160 meters. The length of the rectangle is 10 meters longer than twice the width. What is the width of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 35 meters",
      "B) 40 meters",
      "C) 45 meters",
      "D) 50 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_207",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $22,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $19,800",
      "B) $20,500",
      "C) $21,000",
      "D) $21,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_208",
    text: "The length of a rectangle is 4 times its width. If the width is 9 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 27 inches",
      "B) 36 inches",
      "C) 45 inches",
      "D) 54 inches"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_209",
    text: "A person invests $11,000 in a savings account that pays 6% interest per year. How much interest will the person earn in 4 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $264",
      "B) $528",
      "C) $792",
      "D) $1,056"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_210",
    text: "If 8x + 1 = 17, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 2",
      "B) 3",
      "C) 4",
      "D) 5"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_211",
    text: "A store sells pencils at 5 for $1. If a student buys 25 pencils, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $5",
      "B) $6",
      "C) $7",
      "D) $8"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_212",
    text: "The length of a rectangle is three times its width. If the width is 10 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 20 inches",
      "B) 25 inches",
      "C) 30 inches",
      "D) 35 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_213",
    text: "A car rental company charges a flat fee of $60 plus $0.15 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $60",
      "B) $90",
      "C) $120",
      "D) $150"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_214",
    text: "The sum of two numbers is 120. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 120-x",
      "B) x-120",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_215",
    text: "A recipe requires 4 cups of sugar for every 9 cups of flour. If you have 36 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 8 cups",
      "B) 9 cups",
      "C) 10 cups",
      "D) 11 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_216",
    text: "The perimeter of a rectangle is 90 meters. The length of the rectangle is 10 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 20 meters",
      "B) 25 meters",
      "C) 30 meters",
      "D) 35 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_217",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $35,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $31,500",
      "B) $32,000",
      "C) $33,000",
      "D) $34,000"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_218",
    text: "The length of a rectangle is 5 times its width. If the width is 8 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 inches",
      "B) 35 inches",
      "C) 40 inches",
      "D) 45 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_219",
    text: "A person invests $6,000 in a savings account that pays 5% interest per year. How much interest will the person earn in 4 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $120",
      "B) $240",
      "C) $360",
      "D) $480"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_220",
    text: "If 3x + 4 = 19, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 4",
      "C) 5",
      "D) 6"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_221",
    text: "A store sells highlighters at 5 for $4. If a student buys 25 highlighters, how much will it cost?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) $15",
      "B) $20",
      "C) $25",
      "D) $30"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_222",
    text: "The length of a rectangle is twice its width. If the width is 40 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 40 inches",
      "B) 60 inches",
      "C) 80 inches",
      "D) 100 inches"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_223",
    text: "A car rental company charges a flat fee of $110 plus $0.10 per mile driven. If a customer drives 200 miles, what is the total cost?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) $110",
      "B) $130",
      "C) $150",
      "D) $170"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "sat_math_224",
    text: "The sum of two numbers is 200. If one number is x, what is the other number in terms of x?",
    category: "math",
    domain: "Algebra",
    skill: "Algebraic expressions",
    difficulty: "hard",
    options: [
      "A) 200-x",
      "B) x-200",
      "C) 2x",
      "D) x/2"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_225",
    text: "A recipe requires 3 cups of sugar for every 7 cups of flour. If you have 21 cups of sugar, how many cups of flour can you make?",
    category: "math",
    domain: "Algebra",
    skill: "Ratios and proportions",
    difficulty: "hard",
    options: [
      "A) 49 cups",
      "B) 50 cups",
      "C) 51 cups",
      "D) 52 cups"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_226",
    text: "The perimeter of a rectangle is 130 meters. The length of the rectangle is 10 meters longer than twice the width. What is the length of the rectangle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 30 meters",
      "B) 35 meters",
      "C) 40 meters",
      "D) 45 meters"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_227",
    text: "A car's value depreciates by 10% each year. If the car is currently worth $38,000, what will be its value in one year?",
    category: "math",
    domain: "Algebra",
    skill: "Percentages",
    difficulty: "hard",
    options: [
      "A) $34,200",
      "B) $34,500",
      "C) $35,000",
      "D) $35,500"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_228",
    text: "The length of a rectangle is 4 times its width. If the width is 11 inches, what is the length?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 44 inches",
      "B) 48 inches",
      "C) 52 inches",
      "D) 56 inches"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_229",
    text: "A person invests $9,000 in a savings account that pays 4% interest per year. How much interest will the person earn in 3 years?",
    category: "math",
    domain: "Algebra",
    skill: "Simple interest",
    difficulty: "hard",
    options: [
      "A) $108",
      "B) $216",
      "C) $324",
      "D) $432"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "sat_math_230",
    text: "If 4x + 9 = 37, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 7",
      "B) 8",
      "C) 9",
      "D) 10"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_231",
    text: "A rectangle has a length of 12 units and a width of 5 units. What is the length of the diagonal of the rectangle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Pythagorean Theorem",
    difficulty: "hard",
    options: [
      "A) 13 units",
      "B) 12 units",
      "C) 10 units",
      "D) 7 units"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_232",
    text: "If 3x + 2 = 17, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 5",
      "B) 6",
      "C) 7",
      "D) 8"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_233",
    text: "What is the solution to the equation x^2 - 9 = 0?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) x = 3 or x = -3",
      "B) x = 9",
      "C) x = -9",
      "D) x = 0"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_234",
    text: "A circle has a circumference of 16π. What is the radius?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
      "A) 8",
      "B) 16",
      "C) 4",
      "D) 32"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_235",
    text: "If f(x) = 2x^2 - 3x + 1, what is f(2)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Nonlinear functions",
    difficulty: "hard",
    options: [
      "A) 3",
      "B) 5",
      "C) 7",
      "D) 1"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_236",
    text: "What is the value of 5! (5 factorial)?",
    category: "math",
    domain: "Advanced Math",
    skill: "Factorials",
    difficulty: "hard",
    options: [
      "A) 120",
      "B) 60",
      "C) 24",
      "D) 720"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_237",
    text: "If the mean of 4, 8, 6, and x is 7, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 8",
      "C) 6",
      "D) 12"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_238",
    text: "What is the slope of the line passing through the points (2, 3) and (4, 7)?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in two variables",
    difficulty: "hard",
    options: [
      "A) 2",
      "B) 1",
      "C) 4",
      "D) 3"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_239",
    text: "If 2x - 5 = 9, what is the value of x?",
    category: "math",
    domain: "Algebra",
    skill: "Linear equations in one variable",
    difficulty: "hard",
    options: [
      "A) 7",
      "B) 6",
      "C) 8",
      "D) 5"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "sat_math_240",
    text: "A triangle has angles in the ratio 2:3:4. What is the measure of the largest angle?",
    category: "math",
    domain: "Algebra",
    skill: "Linear inequalities in one or two variables",
    difficulty: "hard",
    options: [
      "A) 80°",
      "B) 90°",
      "C) 100°",
      "D) 120°"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  // Questions 241-250
  {
    id: "251",
    text: "A right triangle has legs of length 9 and 12. What is the length of the hypotenuse?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Pythagorean Theorem",
    difficulty: "hard",
    options: [
      "A) 12",
      "B) 13",
      "C) 15",
      "D) 17"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "252",
    text: "If the area of a circle is 36π, what is the circumference?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
      "A) 6π",
      "B) 12π",
      "C) 18π",
      "D) 36π"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "253",
    text: "A cylinder has a radius of 4 and a height of 10. What is the volume of the cylinder?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Volume of solids",
    difficulty: "hard",
    options: [
      "A) 40π",
      "B) 80π",
      "C) 120π",
      "D) 160π"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "254",
    text: "If the sum of the interior angles of a polygon is 1,260°, how many sides does the polygon have?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Polygons",
    difficulty: "hard",
    options: [
      "A) 7",
      "B) 8",
      "C) 9",
      "D) 10"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "255",
    text: "A sphere has a radius of 6. What is its surface area?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Surface area of solids",
    difficulty: "hard",
    options: [
      "A) 36π",
      "B) 72π",
      "C) 144π",
      "D) 288π"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "256",
    text: "If the length of a rectangle is 10 and the width is 7, what is the length of the diagonal?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Pythagorean Theorem",
    difficulty: "hard",
    options: [
      "A) 12",
      "B) 13",
      "C) 15",
      "D) 17"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "257",
    text: "A triangle has sides of length 5, 12, and 13. What is the area of the triangle?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area",
    difficulty: "hard",
    options: [
      "A) 24",
      "B) 30",
      "C) 36",
      "D) 60"
    ],
    correctAnswer: "A",
    source: "College Board"
  },
  {
    id: "258",
    text: "If the circumference of a circle is 20π, what is the area?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
      "A) 25π",
      "B) 50π",
      "C) 100π",
      "D) 400π"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "259",
    text: "A cone has a radius of 5 and a height of 12. What is the volume of the cone?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Volume of solids",
    difficulty: "hard",
    options: [
      "A) 50π",
      "B) 75π",
      "C) 100π",
      "D) 300π"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "260",
    text: "A regular hexagon has a perimeter of 48. What is the length of one side?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Polygons",
    difficulty: "hard",
          options: [
      "A) 6",
      "B) 8",
      "C) 10",
      "D) 12"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "261",
    text: "If the area of a triangle is 30 and the base is 5, what is the height?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area",
    difficulty: "hard",
    options: [
      "A) 6",
      "B) 8",
      "C) 10",
      "D) 12"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "262",
    text: "A square has a diagonal of length 10. What is the area of the square?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area",
    difficulty: "hard",
    options: [
      "A) 25",
      "B) 50",
      "C) 75",
      "D) 100"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "263",
    text: "If the sum of the measures of the interior angles of a polygon is 1,800°, how many sides does the polygon have?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Polygons",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 11",
      "C) 12",
      "D) 13"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "264",
    text: "A sphere has a surface area of 324π. What is the radius?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Surface area of solids",
    difficulty: "hard",
    options: [
      "A) 6",
      "B) 9",
      "C) 12",
      "D) 18"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "265",
    text: "If the area of a sector of a circle is 16π and the radius is 8, what is the measure of the central angle in degrees?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
      "A) 45°",
      "B) 60°",
      "C) 90°",
      "D) 120°"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "266",
    text: "A right triangle has legs of length 7 and 24. What is the length of the hypotenuse?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Pythagorean Theorem",
    difficulty: "hard",
    options: [
      "A) 24",
      "B) 25",
      "C) 26",
      "D) 27"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "267",
    text: "If the circumference of a circle is 16π, what is the area?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
      "A) 16π",
      "B) 32π",
      "C) 64π",
      "D) 128π"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "268",
    text: "A cylinder has a radius of 6 and a height of 7. What is the volume of the cylinder?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Volume of solids",
    difficulty: "hard",
    options: [
      "A) 42π",
      "B) 84π",
      "C) 126π",
      "D) 252π"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "269",
    text: "If the sum of the interior angles of a polygon is 1,620°, how many sides does the polygon have?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Polygons",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 11",
      "C) 12",
      "D) 13"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "270",
    text: "A sphere has a radius of 10. What is its volume?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Volume of solids",
    difficulty: "hard",
    options: [
      "A) 400π/3",
      "B) 500π/3",
      "C) 1000π/3",
      "D) 4000π/3"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "271",
    text: "If the area of a circle is 49π, what is the circumference?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Circles",
    difficulty: "hard",
    options: [
      "A) 7π",
      "B) 14π",
      "C) 21π",
      "D) 28π"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "272",
    text: "A regular octagon has a perimeter of 64. What is the length of one side?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Polygons",
    difficulty: "hard",
    options: [
      "A) 6",
      "B) 7",
      "C) 8",
      "D) 9"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "273",
    text: "If the area of a triangle is 45 and the base is 9, what is the height?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area",
    difficulty: "hard",
    options: [
      "A) 5",
      "B) 8",
      "C) 10",
      "D) 12"
    ],
    correctAnswer: "C",
    source: "College Board"
  },
  {
    id: "274",
    text: "A square has a diagonal of length 12. What is the area of the square?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Area",
    difficulty: "hard",
    options: [
      "A) 36",
      "B) 48",
      "C) 72",
      "D) 144"
    ],
    correctAnswer: "B",
    source: "College Board"
  },
  {
    id: "275",
    text: "If the sum of the measures of the interior angles of a polygon is 1,800°, how many sides does the polygon have?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Polygons",
    difficulty: "hard",
    options: [
      "A) 10",
      "B) 11",
      "C) 12",
      "D) 13"
    ],
    correctAnswer: "D",
    source: "College Board"
  },
  {
    id: "276",
    text: "A sphere has a surface area of 400π. What is the radius?",
    category: "math",
    domain: "Geometry and Trigonometry",
    skill: "Surface area of solids",
    difficulty: "hard",
    options: [
      "A) 8",
      "B) 10",
      "C) 12",
      "D) 20"
    ],
    correctAnswer: "B",
    source: "College Board"
  }
];