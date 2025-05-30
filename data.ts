
import { DailySchedule, TaskCategory, AnswerInputType } from './types';

const june2025Schedule: DailySchedule[] = [
  // Day 1: 1 июня, воскресенье
  {
    id: "2025-06-01",
    date: new Date(2025, 5, 1),
    dayName: "воскресенье",
    title: "Летний математический старт",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0601_logic_trees",
            text: "Сосна растёт правее липы, а липа правее берёзы. В каком порядке растут деревья (слева направо)?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "берёза, липа, сосна",
            answerHint: "Напиши названия деревьев через запятую."
          },
          {
            id: "0601_math_balls",
            text: "Мама купила 4 шара красного и голубого цвета. Красных шаров было больше, чем голубых. Сколько шаров каждого цвета купила мама?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "3 красных, 1 голубой",
            answerHint: "Например: 5 красных, 2 голубых"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0601_math_birds",
            text: "Во дворе гуляют куры и петух. У каждой курицы по 2 цыпленка. Всего 7 птиц. Сколько всего кур гуляет во дворе?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 2
          },
          {
            id: "0601_world_nature",
            text: "Выбери объекты неживой природы:",
            category: TaskCategory.WORLD,
            source: "Адаптировано из олимпиады по окружающему миру для 1 класса",
            answerInputType: AnswerInputType.CHECKBOX,
            options: [
              { id: "sun", text: "солнце" },
              { id: "stone", text: "камень" },
              { id: "bear", text: "медведь" },
              { id: "cloud", text: "облако" },
              { id: "rock", text: "скала" }
            ],
            correctAnswer: ["sun", "stone", "cloud", "rock"]
          }
        ]
      }
    ]
  },
  // Day 2: 2 июня, понедельник
  {
    id: "2025-06-02",
    date: new Date(2025, 5, 2),
    dayName: "понедельник",
    title: "Словесные превращения",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0602_russian_anagrams",
            text: "Переставь буквы так, чтобы получилось слово. О, В, С, А. Какое слово получилось?",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "сова",
            answerHint: "Это животное."
          },
          {
            id: "0602_russian_sounds",
            text: "Выберите слово, в котором букв меньше, чем звуков:",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "картина" },
              { id: "b", text: "яблоко" },
              { id: "c", text: "парта" },
              { id: "d", text: "якорь" }
            ],
            correctAnswer: "b"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0602_logic_bus",
            text: "Из города в посёлок ехал автобус. Навстречу ему ехало 4 грузовых автомобиля и 5 легковых. Сколько всего машин ехало в посёлок?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 1,
            answerHint: "Сколько машин ехало ИМЕННО В ПОСЁЛОК?"
          },
          {
            id: "0602_russian_vowels",
            text: "В слове 'ягода' выбери буквы, обозначающие гласные звуки:",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса (упрощено)",
            answerInputType: AnswerInputType.CHECKBOX,
            options: [
              { id: "ya", text: "я" },
              { id: "g", text: "г" },
              { id: "o", text: "о" },
              { id: "d", text: "д" },
              { id: "a", text: "а" }
            ],
            correctAnswer: ["ya", "o", "a"]
          }
        ]
      }
    ]
  },
  // Day 3: 3 июня, вторник
  {
    id: "2025-06-03",
    date: new Date(2025, 5, 3),
    dayName: "вторник",
    title: "Числовые головоломки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0603_math_series",
            text: "Продолжите числовой ряд (напиши два следующих числа через запятую): 4, 5, 8, 9, 12, 13, ___, ___",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.TWO_NUMBERS_COMMA,
            correctAnswer: [16, 17]
          },
          {
            id: "0603_math_transport",
            text: "В гараже стоят 4 машины и 2 мотоцикла. Сколько всего видов транспорта стоит в гараже?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 2
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0603_world_planet",
            text: "Мы живём на планете:",
            category: TaskCategory.WORLD,
            source: "Прямо взято из олимпиады по окружающему миру для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "Венера" },
              { id: "b", text: "Луна" },
              { id: "c", text: "Земля" }
            ],
            correctAnswer: "c"
          },
          {
            id: "0603_russian_syllables",
            text: "Раздели слово 'звезда' на слоги (напиши слоги через дефис):",
            category: TaskCategory.RUSSIAN,
            source: "Адаптировано из задания \"Орфографического Эвереста\" для 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "звез-да"
          }
        ]
      }
    ]
  },
   // Day 4: 4 июня, среда
  {
    id: "2025-06-04",
    date: new Date(2025, 5, 4),
    dayName: "среда",
    title: "Природные загадки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0604_world_country",
            text: "В какой стране ты живёшь?",
            category: TaskCategory.WORLD,
            source: "Прямо взято из олимпиады по окружающему миру для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "Франция" },
              { id: "b", text: "Россия" },
              { id: "c", text: "Англия" }
            ],
            correctAnswer: "b"
          },
          {
            id: "0604_world_odd_one_out_plants",
            text: "Укажи лишнее слово: яблоня, груша, ирис, вишня",
            category: TaskCategory.WORLD,
            source: "Прямо взято из олимпиады по окружающему миру для 1 класса (часть а)",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "яблоня" },
              { id: "b", text: "груша" },
              { id: "c", text: "ирис" },
              { id: "d", text: "вишня" }
            ],
            correctAnswer: "c",
            answerHint: "Ирис - это цветок, остальное - деревья с фруктами/ягодами."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0604_math_angles",
            text: "Крышка стола имеет 4 угла. Один угол отпилили. Сколько углов стало у крышки?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 5
          },
          {
            id: "0604_russian_vowel_sounds_mai",
            text: "Сколько гласных звуков в слове 'май'?",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 1,
            answerHint: "В слове 'май' один гласный звук [а]. Буква 'й' обозначает согласный звук."
          }
        ]
      }
    ]
  },
  // Day 5: 5 июня, четверг
  {
    id: "2025-06-05",
    date: new Date(2025, 5, 5),
    dayName: "четверг",
    title: "Логические цепочки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0605_logic_queue",
            text: "В магазине очередь. Один и тот же человек оказался пятым от конца и третьим от начала. Сколько всего человек в очереди?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 7 // (5-1) + (3-1) + 1 = 4 + 2 + 1 = 7
          },
          {
            id: "0605_math_cups",
            text: "Мама поставила на стол 9 чашек, из них перевернули вверх дном 2 чашки. Сколько чашек стало на столе?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 9,
            answerHint: "Переворачивание не меняет количество чашек."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0605_russian_decode",
            text: "Расшифруй слова и напиши их через запятую: язац, циласи",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "заяц, лисица"
          },
          {
            id: "0605_world_animals_scales",
            text: "Как называются животные, у которых тело покрыто чешуёй?",
            category: TaskCategory.WORLD,
            source: "Прямо взято из олимпиады по окружающему миру для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "птицы" },
              { id: "b", text: "рыбы" },
              { id: "c", text: "млекопитающие" }
            ],
            correctAnswer: "b"
          }
        ]
      }
    ]
  },
    // Day 6: 6 июня, пятница
  {
    id: "2025-06-06",
    date: new Date(2025, 5, 6),
    dayName: "пятница",
    title: "Буквенные загадки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0606_russian_capital_letters",
            text: "Выбери слова, которые надо писать с большой буквы:",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса",
            answerInputType: AnswerInputType.CHECKBOX,
            options: [
              { id: "vorobey", text: "воробей" },
              { id: "vishnya", text: "вишня" },
              { id: "nikolaevich", text: "николаевич" },
              { id: "moskva", text: "москва" },
              { id: "yozhik", text: "ёжик" },
              { id: "don", text: "дон" },
              { id: "devochka", text: "девочка" },
              { id: "tsirk", text: "цирк" },
              { id: "solovyov", text: "соловьёв" }
            ],
            correctAnswer: ["nikolaevich", "moskva", "don", "solovyov"]
          },
          {
            id: "0606_russian_add_letter",
            text: "Добавь одну букву в начале слова 'дача', чтобы получилось новое слово. Какое слово получилось?",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "удача",
            answerHint: "Например, к слову 'порт' можно добавить 'с' -> 'спорт'."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0606_logic_flying_birds",
            text: "В воздухе летели орёл, голубь, муха и стрекоза. Сколько всего птиц летело в воздухе?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 2
          },
          {
            id: "0606_math_chairs",
            text: "Как расставить семь стульев у четырех стен, чтобы у каждой стены их было поровну? (Это сложная загадка, ответ может быть неожиданным)",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Одна из возможных идей: поставить 3 стула в 3 угла, а оставшиеся 4 стула - к четвертой стене. Или более простой ответ для детей: невозможно, если поровну это одинаковое число стульев только у одной стены. Или нарисовать так, чтобы у каждой стены было по 2 стула (4 стула по углам, а еще 3 стула не получится расставить поровну без хитрости). Обсуди с родителями!",
            answerHint: "Эта задача часто имеет 'хитрый' ответ или рисунок."
          }
        ]
      }
    ]
  },
  // Day 7: 7 июня, суббота
  {
    id: "2025-06-07",
    date: new Date(2025, 5, 7),
    dayName: "суббота",
    title: "Семейные головоломки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "25 минут",
        tasks: [
          {
            id: "0607_math_family_children",
            text: "У трех братьев по 2 сестры. Сколько всего детей в семье?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 2 класса, адаптировано для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 5 // 3 брата + 2 сестры (они общие для всех братьев)
          },
          {
            id: "0607_russian_gender_pairs",
            text: "Укажи, как зовут ЕЁ: он – кот, она - ?",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса (часть)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "кошка"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0607_logic_checkers_games",
            text: "Петя, Вася, Коля и Саша играли в шашки. Каждый сыграл друг с другом по одной партии. Сколько всего партий сыграли ребята?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 6 // (4 * 3) / 2
          },
          {
            id: "0607_russian_compound_word",
            text: "Составь слово. Из слова 'Радость' бери первый слог, из слова 'задумал' – второй: Какое слово получилось?",
            category: TaskCategory.RUSSIAN,
            source: "Взято из задания \"Орфографического Эвереста\" для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "Раду",
            answerHint: "Ра-(дость), за-ду-(мал)"
          }
        ]
      }
    ]
  },
  // Day 8: 8 июня, воскресенье
  {
    id: "2025-06-08",
    date: new Date(2025, 5, 8),
    dayName: "воскресенье",
    title: "Пространственное мышление",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0608_logic_vehicle_order",
            text: "Машина стоит левее мотоцикла, а мотоцикл стоит левее велосипеда. В каком порядке они стоят (слева направо)?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "машина, мотоцикл, велосипед",
            answerHint: "Напиши через запятую."
          },
          {
            id: "0608_math_equation_ops",
            text: "Вставь вместо многоточия действия '+' или '-', чтобы равенство стало верным: 9 ... 3 ... 5 = 1. Запиши полное верное равенство.",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "9-3-5=1",
            answerHint: "Например: 2+2-1=3"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0608_russian_alphabet_part",
            text: "Выбери и подчеркни ту группу букв, которая является частью алфавита (идет по порядку):",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "А, Б, Г, О, Ю, М, К, Я, П" },
              { id: "b", text: "А, Б, В, Г, Д, Е, Ё" } // З, Ж перепутаны в оригинале, исправлено для логики
            ],
            correctAnswer: "b"
          },
          {
            id: "0608_world_capital_city",
            text: "Вспомни столицу нашего государства:",
            category: TaskCategory.WORLD,
            source: "Прямо взято из олимпиады по окружающему миру для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "a", text: "Тверь" },
              { id: "b", text: "Сыктывкар" },
              { id: "c", text: "Москва" }
            ],
            correctAnswer: "c"
          }
        ]
      }
    ]
  },
  // Day 9: 9 июня, понедельник
  {
    id: "2025-06-09",
    date: new Date(2025, 5, 9),
    dayName: "понедельник",
    title: "Математические фокусы",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0609_math_windows",
            text: "В посёлке построили двухэтажный дом. Всего в доме 12 окон. Сколько окон на каждом этаже, если известно, что на одном этаже на 4 окна больше, чем на другом? Напиши два числа через запятую (меньшее, потом большее).",
            category: TaskCategory.MATH,
            source: "Адаптировано из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.TWO_NUMBERS_COMMA,
            correctAnswer: [4, 8] // x + (x+4) = 12  => 2x+4=12 => 2x=8 => x=4. Этажи: 4 и 8.
          },
          {
            id: "0609_math_masters_work",
            text: "Три мастера ремонтировали машину. Они работали 6 часов. Сколько часов работал каждый мастер, если они работали вместе?",
            category: TaskCategory.MATH,
            source: "Адаптировано из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 6
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0609_russian_alphabet_seventh",
            text: "Какая буква в русском алфавите стоит седьмой по счёту? Обведи её: З, Ж, Е, Ё",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "z", text: "З" },
              { id: "zh", text: "Ж" },
              { id: "e", text: "Е" },
              { id: "yo", text: "Ё" }
            ],
            correctAnswer: "yo" // А Б В Г Д Е Ё
          },
          {
            id: "0609_logic_angles_cut",
            text: "Было 4 угла, один отпилили. Сколько углов осталось?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 2 класса, адаптировано для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 5
          }
        ]
      }
    ]
  },
  // Day 10: 10 июня, вторник
  {
    id: "2025-06-10",
    date: new Date(2025, 5, 10),
    dayName: "вторник",
    title: "Словесная мастерская",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0610_russian_hidden_words",
            text: "В слове 'хлев' спряталось слово. Какое? (Запиши одно это слово)",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "лев"
          },
          {
            id: "0610_russian_make_words_syllables",
            text: "Составь слово из слогов: бул, ка. Какое слово получилось?",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "булка"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0610_math_equation_digits",
            text: "Между какими-то цифрами из набора '1 2 3' поставьте знак равенства и один знак арифметического действия, чтобы получилось верное равенство. Запиши это равенство.",
            category: TaskCategory.MATH,
            source: "Адаптировано из олимпиады \"Эрудит\" по математике для 2 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "1+2=3",
            answerHint: "Используй цифры 1, 2, 3."
          },
          {
            id: "0610_russian_six_sounds",
            text: "В каком из этих слов 6 звуков? Выбери одно:",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "yakor", text: "якорь" }, // [йакар'] - 5 звуков
              { id: "filin", text: "филин" }, // [ф'ил'ин] - 5 звуков
              { id: "pogoda", text: "погода" }, // [пагода] - 6 звуков
              { id: "yulia", text: "Юлия" } // [йул'ийа] - 5 звуков
            ],
            correctAnswer: "pogoda"
          }
        ]
      }
    ]
  },
    // Day 11: 11 июня, среда
  {
    id: "2025-06-11",
    date: new Date(2025, 5, 11),
    dayName: "среда",
    title: "Природа и числа",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0611_math_carlson_buns",
            text: "Карлсон пригласил в гости Малыша. У него было 4 плюшки. Он предложил: 'Малыш, возьми себе целую плюшку, и мне дай половинку от своей'. Сколько плюшек получил в результате Карлсон, если Малыш согласился?",
            category: TaskCategory.MATH,
            source: "Адаптировано из олимпиады \"Эрудит\" по математике для 2 класса (упрощено)",
            answerInputType: AnswerInputType.NUMBER,
            // Карлсон имел 4. Малыш взял 1, у него осталось 3. Карлсон получил 0.5 от Малыша. Итого у Карлсона 3 (свои) + 0.5 (от Малыша) = 3.5.
            // Но вопрос "Сколько получил Карлсон". Если он отдал 1 Малышу, у него 3. Потом Малыш дал ему 0.5. Итого 3.5.
            // Если "Сколько ПЛЮШЕК получил Карлсон" (в смысле, сколько ему ДОБАВИЛОСЬ) - то 0.5.
            // Текст "Вы все возьмите себе по целой плюшке, и мне дайте каждый по половинке" - "все" это только Малыш.
            // "Сколько плюшек ПОЛУЧИЛ В РЕЗУЛЬТАТЕ Карлсон?". Было 4. Отдал 1. Стало 3. Получил 0.5. Стало 3.5.
            // Задание из олимпиады: "Карлсон пригласил в гости Малыша, Фрекен Бок и дядюшку Юлиуса. У него было только 4 плюшки. Он предложил поделить их так: 'Вы все возьмите себе по целой плюшке, и мне дайте каждый по половинке'. Сколько плюшек получил в результате Карлсон?"
            // Тут гостей 3. Отдал 3 плюшки. Осталась 1. Получил 0.5*3 = 1.5. Итого 1+1.5=2.5
            // В нашем случае 1 гость. Было 4. Отдал 1. Осталось 3. Получил 0.5. Итого 3.5.
            correctAnswer: 3.5,
            answerHint: "Можно использовать десятичную дробь, например 3.5"
          },
          {
            id: "0611_logic_fibonacci",
            text: "Продолжи ряд чисел, добавив еще два числа (через запятую): 1, 1, 2, 3, 5, ..., ...",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из олимпиады \"Эрудит\" по математике для 2 класса",
            answerInputType: AnswerInputType.TWO_NUMBERS_COMMA,
            correctAnswer: [8, 13]
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0611_russian_alphabet_order",
            text: "Расставь буквы в алфавитном порядке и запиши их через запятую: М, Ш, Ф, К, В, Я, Ч",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "В, К, М, Ф, Ч, Ш, Я"
          },
          {
            id: "0611_russian_fix_errors",
            text: "Исправь ошибку в слове 'ежы'. Напиши правильное слово.",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "ежи"
          }
        ]
      }
    ]
  },
  // Day 12: 12 июня, четверг
  {
    id: "2025-06-12",
    date: new Date(2025, 5, 12),
    dayName: "четверг",
    title: "Государственный праздник",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0612_world_flag_colors",
            text: "Назови цвета российского флага, начиная сверху, через запятую.",
            category: TaskCategory.WORLD,
            source: "Прямо взято из олимпиады по окружающему миру для 1 класса (адаптировано)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "белый, синий, красный",
            requiresParentalDrawing: false, // Changed to text question
            answerHint: "Белый, Синий, Красный"
          },
          {
            id: "0612_math_week_days",
            text: "Мама сказала Оле: 'До Нового года осталась ровно неделя'. А сколько же это дней?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 7
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0612_logic_height_comparison",
            text: "Коля выше Игоря, но ниже Володи. Кто из мальчиков самый высокий?",
            category: TaskCategory.LOGIC,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
              { id: "kolya", text: "Коля" },
              { id: "igor", text: "Игорь" },
              { id: "volodya", text: "Володя" }
            ],
            correctAnswer: "volodya"
          },
          {
            id: "0612_russian_comma_list",
            text: "Запиши слова через запятую: ЛЕС СЛОН МАРИНА",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "ЛЕС, СЛОН, МАРИНА"
          }
        ]
      }
    ]
  },
  // Day 13: 13 июня, пятница
  {
    id: "2025-06-13",
    date: new Date(2025, 5, 13),
    dayName: "пятница",
    title: "Творческие задачи",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0613_math_fly_boots",
            text: "Модница-муха решила купить себе сапожки. Сколько надо купить пар сапожек, если у мухи шесть ножек?",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 3 // 6 ножек / 2 ножки в паре = 3 пары
          },
          {
            id: "0613_math_add_squares",
            text: "Первая фигура состоит из 3 квадратиков (буква Г). Вторая фигура - это квадрат 2х2 (4 квадратика). Сколько квадратиков надо добавить к первой фигуре, чтобы получить вторую?",
            category: TaskCategory.MATH,
            source: "Адаптировано из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 1,
            requiresParentalDrawing: false // Defined figures in text
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0613_russian_sound_count_poem",
            text: "Сколько раз в этих строчках встречается звук [в]? 'Вот иголки и булавки выползают из-под лавки.'",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (часть стихотворения)",
            answerInputType: AnswerInputType.NUMBER,
            // В[в]от, була[в]ки, [в]ыползают, из-под ла[в]ки. = 4
            correctAnswer: 4
          },
          {
            id: "0613_logic_students_count",
            text: "Иру спросили: 'Сколько учеников в твоем классе?' Ира ответила: 'Если к нашему числу прибавить столько же, да еще половину, то будет 15'. Сколько учеников в классе у Иры?",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из олимпиадных заданий для подготовки 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 6 // x + x + x/2 = 15 => 2.5x = 15 => x = 15 / 2.5 => x = 6
          }
        ]
      }
    ]
  },
    // Day 14: 14 июня, суббота
  {
    id: "2025-06-14",
    date: new Date(2025, 5, 14),
    dayName: "суббота",
    title: "Семейное творчество",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "25 минут",
        tasks: [
          {
            id: "0614_complex_position",
            text: "На каком рисунке кружок ВЫШЕ и ПРАВЕЕ звёздочки? (Представь себе варианты)",
            category: TaskCategory.COMPLEX,
            source: "Адаптировано из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.RADIO,
            options: [
                {id: "a", text: "А) Кружок под звёздочкой и слева от неё."},
                {id: "b", text: "Б) Кружок над звёздочкой и справа от неё."},
                {id: "c", text: "В) Кружок над звёздочкой и слева от неё."}
            ],
            correctAnswer: "b",
            requiresParentalDrawing: false // Changed to descriptive options
          },
          {
            id: "0614_russian_remove_syllable",
            text: "Зачеркни лишний слог, чтобы получилось слово. СОРОЛОЛВЕЙ. Какое слово получилось?",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса (упрощено)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "СОЛОВЕЙ" // убираем РО или ЛОЛ
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0614_math_number_series_descending",
            text: "Продолжите числовой ряд (по два числа через запятую): 25,25,21,21,17,17, ___, ___",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.TWO_NUMBERS_COMMA,
            correctAnswer: [13, 13] // Pattern: repeat, subtract 4, repeat
          },
          {
            id: "0614_russian_find_words_z",
            text: "Из списка слов: ЗЕБРА, СОБАКА, ЗАЯЦ, КОШКА, ЗОНТ - выбери те, что начинаются на букву З.",
            category: TaskCategory.RUSSIAN,
            source: "Адаптировано из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.CHECKBOX,
            options: [
                {id: "zebra", text: "ЗЕБРА"},
                {id: "sobaka", text: "СОБАКА"},
                {id: "zayac", text: "ЗАЯЦ"},
                {id: "koshka", text: "КОШКА"},
                {id: "zont", text: "ЗОНТ"}
            ],
            correctAnswer: ["zebra", "zayac", "zont"],
            requiresParentalDrawing: false // Changed to list
          }
        ]
      }
    ]
  },
  // Day 15: 15 июня, воскресенье
  {
    id: "2025-06-15",
    date: new Date(2025, 5, 15),
    dayName: "воскресенье",
    title: "Итоги половины месяца",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0615_math_number_series_alternating",
            text: "Продолжите числовой ряд (по два числа через запятую): 8, 7, 10, 9, 12, 11, ____, ____",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиады \"УМКА\" 2015 для 1 класса",
            answerInputType: AnswerInputType.TWO_NUMBERS_COMMA,
            correctAnswer: [14, 13] // Pattern: N, N-1, N+2, (N+2)-1
          },
          {
            id: "0615_logic_cat_tail",
            text: "Мой хвост – сказал кот, – имеет длину 12 см и ещё половину моего хвоста. Какова длина хвоста кота (в см)?",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из олимпиады \"Эрудит\" по математике для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 24 // x = 12 + x/2  => x/2 = 12 => x = 24
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0615_russian_make_sentence",
            text: "Из данной группы слов составь и запиши предложение: Толя, моряки, и, Петя, к, плывут, земле",
            category: TaskCategory.RUSSIAN,
            source: "Прямо взято из олимпиады по русскому языку для 1 класса",
            answerInputType: AnswerInputType.TEXTAREA,
            correctAnswer: "Толя и Петя плывут к земле." // Или "Моряки Толя и Петя плывут к земле."
            // Гибкая проверка нужна. Допустим "Толя и Петя плывут к земле."
          },
          {
            id: "0615_world_domestic_animals",
            text: "Выбери всех домашних животных:",
            category: TaskCategory.WORLD,
            source: "Сгенерировано по аналогии с классификационными заданиями из олимпиад по окружающему миру",
            answerInputType: AnswerInputType.CHECKBOX,
            options: [
              { id: "cow", text: "корова" },
              { id: "fox", text: "лиса" },
              { id: "dog", text: "собака" },
              { id: "hare", text: "заяц" },
              { id: "cat", text: "кошка" },
              { id: "wolf", text: "волк" },
              { id: "sheep", text: "овца" }
            ],
            correctAnswer: ["cow", "dog", "cat", "sheep"]
          }
        ]
      }
    ]
  },
  // Day 16: 16 июня, понедельник
  {
    id: "2025-06-16",
    date: new Date(2025, 5, 16),
    dayName: "понедельник",
    title: "Комбинаторные задачи",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0616_math_towers",
            text: "У Кати есть 2 разноцветных кубика: красный и синий. Сколько разных башен она может построить, если в каждой башне оба кубика (один на другом)?",
            category: TaskCategory.MATH,
            source: "Адаптировано из комбинаторных задач на основе принципов олимпиады \"УМКА\"",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 2 // красный-синий, синий-красный
          },
          {
            id: "0616_logic_children_row",
            text: "В ряду стоят 5 детей. Маша не первая и не последняя. Петя стоит рядом с Машей. На каких местах может стоять Маша (перечисли через запятую, если их несколько)?",
            category: TaskCategory.LOGIC,
            source: "Сгенерировано по типу позиционных задач из олимпиадных материалов",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "2, 3, 4", // Маша может быть 2,3,4. Если Маша 2, Петя 1 или 3. Если Маша 3, Петя 2 или 4. Если Маша 4, Петя 3 или 5. Все варианты возможны.
            answerHint: "Места нумеруются 1, 2, 3, 4, 5."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0616_russian_words_from_word",
            text: "Из слова КАЛЕНДАРЬ составь 2 новых слова (не менее 3 букв). Напиши их через запятую.",
            category: TaskCategory.RUSSIAN,
            source: "Адаптировано по принципу словообразования из курса \"Занимательный русский язык\"",
            answerInputType: AnswerInputType.PARENT_CHECK, // Творческое, много вариантов
            correctAnswer: "Примеры: рана, клад, дар, рак, лак, ель, день, даль, Лена, Карл. Проверьте с родителями."
          },
          {
            id: "0616_world_plant_cycle",
            text: "Расположи по порядку: семечко, росток, цветок, плод. Напиши через запятую.",
            category: TaskCategory.WORLD,
            source: "Сгенерировано на основе заданий на причинно-следственные связи",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "семечко, росток, цветок, плод"
          }
        ]
      }
    ]
  },
  // Day 17: 17 июня, вторник
  {
    id: "2025-06-17",
    date: new Date(2025, 5, 17),
    dayName: "вторник",
    title: "Пространственное мышление",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0617_visual_house_shapes",
            text: "Ты нарисовал домик: крыша-треугольник, стена-квадрат, труба-прямоугольник, окошко-круг. Сколько всего разных геометрических фигур ты использовал?",
            category: TaskCategory.VISUAL,
            source: "Сгенерировано по принципу геометрических заданий из материалов \"36 занятий для будущих отличников\"",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 4
          },
          {
            id: "0617_math_apples_half",
            text: "Мама купила 6 яблок. Она дала сыну половину всех яблок. Сколько яблок получил сын?",
            category: TaskCategory.MATH,
            source: "Адаптировано из задач на деление пополам для 1 класса",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 3
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0617_logic_decode_alphabet_shift",
            text: "Расшифруй слово: каждую букву замени на следующую в алфавите. Слово: ЗНМП. (Алфавит: ...ЕЁЖЗИЙКЛМНОПР... После Я идёт А).",
            category: TaskCategory.LOGIC,
            source: "Сгенерировано по аналогии с шифровальными заданиями из олимпиад",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "ИОНР" // З->И, Н->О, М->Н, П->Р
          },
          {
            id: "0617_russian_change_letters_word",
            text: "Какое слово получится, если в слове КОРОВА заменить первую букву на Б, а последнюю на Н?",
            category: TaskCategory.RUSSIAN,
            source: "Сгенерировано по принципу замены букв из курса \"Занимательный русский язык\"",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "БОРОВН" // Слово не обязательно должно быть осмысленным
          }
        ]
      }
    ]
  },
   // Day 18: 18 июня, среда
  {
    id: "2025-06-18",
    date: new Date(2025, 5, 18),
    dayName: "среда",
    title: "Многошаговые задачи",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0618_math_bus_passengers",
            text: "В автобусе ехало 8 человек. На остановке вышли 3 человека, а зашли 2. Потом ещё вышел 1 человек. Сколько человек стало в автобусе?",
            category: TaskCategory.MATH,
            source: "Адаптировано из многошаговых задач олимпиады \"УМКА\" с увеличением сложности",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 6 // 8 - 3 + 2 - 1 = 6
          },
          {
            id: "0618_world_animal_groups",
            text: "Раздели на две группы: медведь, ворона, лиса, воробей, заяц, синица, волк. По какому признаку ты их разделил? (Напиши признак)",
            category: TaskCategory.WORLD,
            source: "Адаптировано из классификационных заданий олимпиады по окружающему миру",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "звери и птицы",
            answerHint: "Например: по цвету, по размеру, звери и птицы..."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0618_russian_word_chain",
            text: "Составь цепочку из 3 слов: каждое следующее слово должно начинаться на последнюю букву предыдущего. Начни со слова АРБУЗ.",
            category: TaskCategory.RUSSIAN,
            source: "Адаптировано по принципу словесных цепочек из занимательных заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Пример: АРБУЗ - ЗУБ - БАНАН. Проверьте с родителями."
          },
          {
            id: "0618_logic_farmer_animals",
            text: "У фермера есть курицы и кролики. Всего у них 6 голов и 14 ног. Сколько кур и сколько кроликов? (Напиши: X кур, Y кроликов)",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из классических логических задач для начальной школы",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "5 кур, 1 кролик",
            answerHint: "Куриц __, кроликов __" // к+р=6, 2к+4р=14 => 2к+4(6-к)=14 => 2к+24-4к=14 => -2к=-10 => к=5, р=1
          }
        ]
      }
    ]
  },
  // Day 19: 19 июня, четверг
  {
    id: "2025-06-19",
    date: new Date(2025, 5, 19),
    dayName: "четверг",
    title: "Творческие задачи",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0619_math_sticks_triangles",
            text: "Из 6 одинаковых палочек нужно построить 4 треугольника. Как это сделать? (Опиши или попроси родителя помочь нарисовать)",
            category: TaskCategory.MATH,
            source: "Адаптировано из пространственных задач повышенной сложности",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Сделать объемную фигуру - тетраэдр (пирамиду с треугольным основанием).",
            requiresParentalDrawing: true
          },
          {
            id: "0619_visual_pattern_drawing",
            text: "Нарисуй узор из кругов и квадратов так, чтобы фигуры чередовались, и в ряду было 6 фигур. (Это задание для рисования на бумаге)",
            category: TaskCategory.VISUAL,
            source: "Сгенерировано по принципу визуальных паттернов",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Например: Круг, Квадрат, Круг, Квадрат, Круг, Квадрат. Родитель проверит рисунок.",
            requiresParentalDrawing: true
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0619_russian_sentence_k",
            text: "Придумай и запиши предложение, в котором все слова начинаются на букву К (минимум 3 слова).",
            category: TaskCategory.RUSSIAN,
            source: "Сгенерировано по принципу творческих заданий курса \"Занимательный русский язык\"",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Пример: Красивый кот качался. Проверьте с родителями."
          },
          {
            id: "0619_math_apples_combinations",
            text: "В вазе лежат 3 красных яблока и 2 зелёных. Сколько способов есть взять 2 яблока разных цветов?",
            category: TaskCategory.MATH,
            source: "Адаптировано из простейших комбинаторных задач",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 6 // (3 красных * 2 зеленых)
          }
        ]
      }
    ]
  },
  // Day 20: 20 июня, пятница
  {
    id: "2025-06-20",
    date: new Date(2025, 5, 20),
    dayName: "пятница",
    title: "Исследовательские навыки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "25 минут",
        tasks: [
          {
            id: "0620_world_summer_signs",
            text: "Понаблюдай за погодой и природой. Назови 2 признака лета.",
            category: TaskCategory.WORLD,
            source: "Сгенерировано на основе наблюдательных заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Примеры: тепло, длинный день, зеленые листья, цветут цветы. Обсуди с родителями."
          },
          {
            id: "0620_russian_sounds_more_than_letters",
            text: "Найди все слова, в которых звуков больше, чем букв: ёлка, дом, якорь, кот, юла.",
            category: TaskCategory.RUSSIAN,
            source: "Адаптировано из фонетических заданий олимпиады по русскому языку",
            answerInputType: AnswerInputType.CHECKBOX,
            options: [
              {id: "elka", text: "ёлка"}, // [й'олка] - 5зв, 4б
              {id: "dom", text: "дом"},   // [дом] - 3зв, 3б
              {id: "yakor", text: "якорь"},// [й'акар'] - 5зв, 5б (мягкий знак звука не дает)
              {id: "kot", text: "кот"},   // [кот] - 3зв, 3б
              {id: "yula", text: "юла"}   // [й'ула] - 4зв, 3б
            ],
            correctAnswer: ["elka", "yula"]
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0620_math_arithmetic_progression",
            text: "Найди закономерность и напиши два следующих числа через запятую: 1, 4, 7, 10, ?, ?",
            category: TaskCategory.MATH,
            source: "Сгенерировано по типу арифметических прогрессий",
            answerInputType: AnswerInputType.TWO_NUMBERS_COMMA,
            correctAnswer: [13, 16] // +3
          },
          {
            id: "0620_logic_word_transformation_animal",
            text: "Превращения слов: измени одну букву в слове КОТ, чтобы получилось животное, которое живёт в воде.",
            category: TaskCategory.LOGIC,
            source: "Сгенерировано по принципу трансформации слов",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "кит"
          }
        ]
      }
    ]
  },
  // Day 21: 21 июня, суббота
  {
    id: "2025-06-21",
    date: new Date(2025, 5, 21),
    dayName: "суббота",
    title: "Семейная олимпиада",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "30 минут",
        tasks: [
          {
            id: "0621_complex_family_math",
            text: "Семейная математика: папа старше мамы на 2 года, маме 30 лет, а ребёнку в 5 раз меньше лет, чем маме. Сколько лет папе и сколько ребёнку? (Напиши: Папе X, ребенку Y)",
            category: TaskCategory.COMPLEX,
            source: "Адаптировано из возрастных задач с упрощением для семейного решения",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "Папе 32, ребенку 6", // Мама=30, Папа=32, Ребенок=30/5=6
            answerHint: "Папе __, ребенку __"
          },
          {
            id: "0621_creative_family_crest",
            text: "Придумайте семейный герб из 2-3 простых геометрических фигур (круг, квадрат, треугольник) и объясните (очень кратко), что означает каждая фигура. (Это задание для обсуждения и рисования с семьей)",
            category: TaskCategory.CREATIVE,
            source: "Сгенерировано по принципу проектных заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Обсудите и нарисуйте вместе! Главное - участие и фантазия.",
            requiresParentalDrawing: true
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0621_world_nature_in_park",
            text: "Назови по 1 объекту живой и 1 объекту неживой природы, которые можно увидеть летом в парке. (Напиши через запятую)",
            category: TaskCategory.WORLD,
            source: "Сгенерировано на основе классификационных заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Примеры: Живая - дерево, цветок, птица, бабочка. Неживая - камень, скамейка, дорожка, солнце. Обсуди с родителями."
          },
          {
            id: "0621_math_ball_probability",
            text: "В коробке лежат шары: 2 красных, 2 синих, 1 жёлтый. Мальчик вытащил наугад 2 шара. Могли ли они быть одного цвета? (Да/Нет)",
            category: TaskCategory.MATH,
            source: "Адаптировано из простейших вероятностных задач",
            answerInputType: AnswerInputType.RADIO,
            options: [{id: "yes", text: "Да"}, {id: "no", text: "Нет"}],
            correctAnswer: "yes" // Да, мог вытащить 2 красных или 2 синих.
          }
        ]
      }
    ]
  },
  // Day 22: 22 июня, воскресенье
  {
    id: "2025-06-22",
    date: new Date(2025, 5, 22),
    dayName: "воскресенье",
    title: "Логические лабиринты",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0622_logic_girls_houses",
            text: "Три девочки - Аня, Оля и Вера - живут в домах разного цвета: красном, синем и жёлтом. Аня не живёт в красном доме. Оля не живёт ни в красном, ни в синем доме. В каком доме живёт каждая девочка? (Напиши: Аня - цвет, Оля - цвет, Вера - цвет)",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из логических задач олимпиадного уровня (условие изменено для однозначности)",
            answerInputType: AnswerInputType.TEXTAREA,
            // Оля != К, Оля != С => Оля = Ж.
            // Аня != К. Аня != Ж (т.к. Оля=Ж) => Аня = С.
            // Вера = К.
            correctAnswer: "Аня - синий, Оля - желтый, Вера - красный"
          },
          {
            id: "0622_math_calendar_days",
            text: "В июне 30 дней. Сегодня 22 июня. Сколько дней осталось до конца месяца?",
            category: TaskCategory.MATH,
            source: "Сгенерировано как практическое применение математики",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 8 // 30 - 22 = 8
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0622_russian_summer_couplet",
            text: "Сочини двустишие (2 строчки) про лето, используя слова: солнце, цветы. (Творческое задание)",
            category: TaskCategory.POETIC,
            source: "Сгенерировано по принципу творческих заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Прочитай родителям свое стихотворение!"
          },
          {
            id: "0622_world_eco_chain",
            text: "Объясни цепочку: дождь → трава → корова → молоко. Что произойдёт с травой, если долго не будет дождя?",
            category: TaskCategory.WORLD,
            source: "Сгенерировано по принципу экологических цепочек",
            answerInputType: AnswerInputType.TEXTAREA,
            correctAnswer: "Трава засохнет или будет плохо расти.", // Гибкая проверка
            answerHint: "Напиши, что случится с травой."
          }
        ]
      }
    ]
  },
    // Day 23: 23 июня, понедельник
  {
    id: "2025-06-23",
    date: new Date(2025, 5, 23),
    dayName: "понедельник",
    title: "Интегрированные задачи",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0623_complex_flower_bees",
            text: "У цветка 5 лепестков. В букете 3 таких цветка. Прилетела ОДНА пчела и села на каждый лепесток КАЖДОГО цветка по очереди. Сколько раз пчела садилась на лепестки?",
            category: TaskCategory.COMPLEX,
            source: "Сгенерировано как интегрированная задача математика + окружающий мир (уточнено условие)",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 15 // 5 лепестков * 3 цветка = 15 раз
          },
          {
            id: "0623_visual_butterfly_symmetry",
            text: "Нарисуй симметричную бабочку. Если на левом крыле у нее 3 пятнышка, сколько пятнышек должно быть на правом крыле, чтобы она была симметричной?",
            category: TaskCategory.VISUAL,
            source: "Адаптировано из заданий на симметрию",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 3,
            requiresParentalDrawing: true // Рисование бабочки - на бумаге
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0623_world_capital_history",
            text: "Какой город является столицей России? (Одно слово)",
            category: TaskCategory.WORLD,
            source: "Адаптировано из исторических заданий для начальной школы",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "Москва"
          },
          {
            id: "0623_math_cube_cut",
            text: "Представь куб. Если его разрезать ОДИН раз пополам (например, сверху вниз), сколько НОВЫХ граней (плоских поверхностей на месте разреза) появится у двух получившихся частей вместе?",
            category: TaskCategory.MATH,
            source: "Адаптировано из пространственных задач повышенной сложности",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 2 // Каждый разрез создает 2 новые грани.
          }
        ]
      }
    ]
  },
  // Day 24: 24 июня, вторник
  {
    id: "2025-06-24",
    date: new Date(2025, 5, 24),
    dayName: "вторник",
    title: "Пространственные головоломки",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0624_geometry_children_row_position",
            text: "В ряду стоят 7 детей. Маша не первая и не последняя. Петя стоит рядом с Машей справа. На каких местах (номерах) может стоять Маша? Перечисли через запятую.",
            category: TaskCategory.GEOMETRY,
            source: "Адаптировано из позиционных задач олимпиадного уровня",
            answerInputType: AnswerInputType.TEXT,
            // Маша не 1, не 7. Значит, Маша 2,3,4,5,6.
            // Петя справа от Маши. Значит, Маша не может быть 6 (Петя был бы 7-м).
            // Маша может быть 2 (Петя 3), 3 (Петя 4), 4 (Петя 5), 5 (Петя 6).
            correctAnswer: "2, 3, 4, 5"
          },
          {
            id: "0624_russian_word_chain_long",
            text: "Составь цепочку из 3 слов: каждое следующее слово должно начинаться на последнюю букву предыдущего. Начни со слова ЗАВОД.",
            category: TaskCategory.RUSSIAN,
            source: "Усложненное задание по принципу словесных цепочек",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Пример: ЗАВОД - ДОМ - МАК. Проверьте с родителями."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0624_math_stickers_ratio",
            text: "У Маши в 2 раза больше наклеек, чем у Пети. Вместе у них 9 наклеек. Сколько наклеек у каждого? (Напиши: Маша - X, Петя - Y)",
            category: TaskCategory.MATH,
            source: "Адаптировано из олимпиадных задач для начальной школы",
            answerInputType: AnswerInputType.TEXT,
            // Петя = x, Маша = 2x. x + 2x = 9 => 3x = 9 => x = 3. Петя = 3, Маша = 6.
            correctAnswer: "Маша - 6, Петя - 3",
            answerHint: "Маша - __, Петя - __"
          },
          {
            id: "0624_world_sink_float_experiment",
            text: "Проведи эксперимент (с помощью родителей): какие предметы тонут в воде, а какие плавают? Проверь: деревянная ложка, металлическая ложка. Что плавает, а что тонет?",
            category: TaskCategory.WORLD,
            source: "Сгенерировано по принципу экспериментальных заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Деревянная ложка плавает, металлическая тонет. Обсуди результат.",
            requiresParentalDrawing: true // Implies actual experiment
          }
        ]
      }
    ]
  },
    // Day 25: 25 июня, среда
  {
    id: "2025-06-25",
    date: new Date(2025, 5, 25),
    dayName: "среда",
    title: "Исследовательская деятельность",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0625_logic_boys_hats",
            text: "Три мальчика - Коля, Вася и Петя - носят шапки разного цвета: красную, синюю и жёлтую. Коля не носит красную шапку. Вася не носит ни красную, ни синюю шапку. Какого цвета шапка у каждого мальчика? (Напиши: Коля - цвет, Вася - цвет, Петя - цвет)",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из логических задач олимпиадного уровня (условие изменено для однозначности)",
            answerInputType: AnswerInputType.TEXTAREA,
            // Вася != К, Вася != С => Вася = Ж.
            // Коля != К. Коля != Ж (т.к. Вася=Ж) => Коля = С.
            // Петя = К.
            correctAnswer: "Коля - синяя, Вася - желтая, Петя - красная"
          },
          {
            id: "0625_math_zoo_animals",
            text: "В зоопарке в одном вольере живут 2 слона и 3 слонёнка (всего 5 слоновых). В соседнем вольере живёт в 2 раза меньше жирафов, чем взрослых слонов в первом вольере. Сколько всего животных (слоновых и жирафов) в двух вольерах?",
            category: TaskCategory.MATH,
            source: "Адаптировано из многошаговых задач с элементами умножения",
            answerInputType: AnswerInputType.NUMBER,
            // Взрослых слонов = 2. Жирафов = 2 / 2 = 1. Всего слоновых = 5. Всего животных = 5 + 1 = 6.
            correctAnswer: 6
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0625_russian_word_transformation_food",
            text: "Превращения слов: измени одну букву в слове ДОМ, чтобы получилось то, что едят.",
            category: TaskCategory.RUSSIAN,
            source: "Сгенерировано по принципу трансформации слов",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "сом" // Или "дым" (копчености), но "сом" проще.
          },
          {
            id: "0625_world_animal_quiz",
            text: "Викторина: Какое животное самое высокое на Земле?",
            category: TaskCategory.WORLD,
            source: "Сгенерировано по типу вопросов для расширения кругозора",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "жираф"
          }
        ]
      }
    ]
  },
  // Day 26: 26 июня, четверг
  {
    id: "2025-06-26",
    date: new Date(2025, 5, 26),
    dayName: "четверг",
    title: "Комплексные задачи",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0626_complex_word_math",
            text: "В слове МАТЕМАТИКА 10 букв. Составь из этих букв 2 новых слова (каждое не менее 3 букв). Запиши их через запятую.",
            category: TaskCategory.COMPLEX,
            source: "Сгенерировано как финальное задание, объединяющее русский язык и математику",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Примеры: тема, мама, кит, тик, мат, мак. Проверьте с родителями."
          },
          {
            id: "0626_logic_rebus_difficult",
            text: "Это очень сложный ребус для первого класса: 'В□СЬ + ДВА = ОДИН'. Обычно такие ребусы решают подбором цифр вместо букв. Попробуй угадать простое сложение, где буквы заменены цифрами, например A+B=C. (Это задание на подумать, можно с родителями)",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из криптоарифметических задач для начальной школы",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Оригинальный ребус сложен. Пример простого: если А=1, Б=2, то в ребусе А+Б=В, В будет равно 3. Обсудите с родителями."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0626_math_ice_cream_purchase",
            text: "Суперзадача: В магазине продают мороженое по 10 рублей за штуку. У Саши есть 35 рублей. Сколько мороженого он может купить и сколько денег у него останется? (Напиши: X мороженых, Y рублей останется)",
            category: TaskCategory.MATH,
            source: "Адаптировано из практических задач повышенной сложности",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "3 мороженых, 5 рублей останется", // 35 / 10 = 3 с остатком 5
            answerHint: "__ мороженых, __ рублей останется"
          },
          {
            id: "0626_russian_word_in_word_sportsmen",
            text: "Найди 2 слова внутри слова СПОРТСМЕН (не менее 3 букв). Напиши их через запятую.",
            category: TaskCategory.RUSSIAN,
            source: "Усложненное задание по принципу поиска слов в словах",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Примеры: спорт, порт, сом, сон, метр. Проверьте с родителями."
          }
        ]
      }
    ]
  },
    // Day 27: 27 июня, пятница
  {
    id: "2025-06-27",
    date: new Date(2025, 5, 27),
    dayName: "пятница",
    title: "Творческие проекты",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "25 минут",
        tasks: [
          {
            id: "0627_project_new_game",
            text: "Придумай новую игру с 2 простыми правилами, используя только мяч. Опиши правила. (Творческое задание)",
            category: TaskCategory.PROJECT,
            source: "Сгенерировано по принципу проектных заданий",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Расскажи родителям о своей игре!"
          },
          {
            id: "0627_poetic_summer_quatrain",
            text: "Сочини четверостишие (4 строчки) про лето, используя слова: солнце, радость. (Творческое задание)",
            category: TaskCategory.POETIC,
            source: "Усложненное творческое задание",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Прочитай родителям свое стихотворение!"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0627_math_apartments_logic",
            text: "В доме 3 этажа, на каждом этаже по 2 квартиры. Семья занимает половину всех квартир. Сколько квартир у семьи?",
            category: TaskCategory.MATH,
            source: "Адаптировано из практических задач олимпиадного типа",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 3 // Всего квартир = 3*2=6. Половина = 6/2=3.
          },
          {
            id: "0627_russian_anagrams_hard",
            text: "Переставь буквы так, чтобы получилось новое слово: НАСОС. Какое слово получилось?",
            category: TaskCategory.RUSSIAN,
            source: "Усложненное задание по принципу анаграмм (упрощено до одного слова)",
            answerInputType: AnswerInputType.TEXT,
            correctAnswer: "сосна"
          }
        ]
      }
    ]
  },
  // Day 28: 28 июня, суббота
  {
    id: "2025-06-28",
    date: new Date(2025, 5, 28),
    dayName: "суббота",
    title: "Олимпиадный тренинг",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "30 минут",
        tasks: [
          {
            id: "0628_math_stickers_ratio_hard",
            text: "Олимпиадная задача: У Маши в 3 раза больше наклеек, чем у Пети. Вместе у них 12 наклеек. Сколько наклеек у каждого? (Напиши: Маша - X, Петя - Y)",
            category: TaskCategory.MATH,
            source: "Прямо взято из олимпиадных задач для 1-2 классов",
            answerInputType: AnswerInputType.TEXT,
            // Петя = x, Маша = 3x. x + 3x = 12 => 4x = 12 => x = 3. Петя = 3, Маша = 9.
            correctAnswer: "Маша - 9, Петя - 3",
            answerHint: "Маша - __, Петя - __"
          },
          {
            id: "0628_erudition_quiz_hard",
            text: "Викторина: Сколько цветов в радуге?",
            category: TaskCategory.ERUDITION,
            source: "Сгенерировано по типу вопросов олимпиады \"Эрудит\" для расширения кругозора",
            answerInputType: AnswerInputType.NUMBER,
            correctAnswer: 7
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0628_complex_family_math_story",
            text: "Семейная головоломка: придумайте всей семьёй математическую сказку (2-3 предложения) про числа от 1 до 3. (Творческое задание)",
            category: TaskCategory.COMPLEX,
            source: "Сгенерировано по принципу семейных олимпиадных проектов",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Расскажите друг другу свои сказки!"
          },
          {
            id: "0628_logic_candy_probability_hard",
            text: "Сложная задача: В коробке лежат конфеты: 3 шоколадных и 2 карамельки. Не глядя, девочка взяла 2 конфеты. Могли ли обе конфеты быть шоколадными? (Да/Нет)",
            category: TaskCategory.LOGIC,
            source: "Усложненная вероятностная задача для начальной школы",
            answerInputType: AnswerInputType.RADIO,
            options: [{id: "yes", text: "Да"}, {id: "no", text: "Нет"}],
            correctAnswer: "yes" // Да, могла взять 2 из 3 шоколадных.
          }
        ]
      }
    ]
  },
    // Day 29: 29 июня, воскресенье
  {
    id: "2025-06-29",
    date: new Date(2025, 5, 29),
    dayName: "воскресенье",
    title: "Семейные интеллектуальные игры",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "30 минут",
        tasks: [
          {
            id: "0629_creative_medal_drawing",
            text: "Создай медаль для себя за успешное завершение июньской программы. Нарисуй её и напиши (1-2 слова), за что ты себя награждаешь. (Творческое задание)",
            category: TaskCategory.CREATIVE,
            source: "Сгенерировано для положительного завершения программы и мотивации",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Покажи родителям свою медаль! Ты молодец!",
            requiresParentalDrawing: true
          },
          {
            id: "0629_reflexive_favorite_task",
            text: "Вспомни самое интересное задание из всех, что ты решал в июне. Расскажи (1-2 предложения), почему оно тебе понравилось. (Задание на размышление)",
            category: TaskCategory.REFLEXIVE,
            source: "Сгенерировано для развития рефлексивных навыков",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Поделись своими мыслями с родителями!"
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "15 минут",
        tasks: [
          {
            id: "0629_math_final_students_languages",
            text: "Итоговая задача: В классе 20 учеников. Половина из них изучает английский язык, четверть - немецкий, остальные - французский. Сколько учеников изучает французский язык?",
            category: TaskCategory.MATH,
            source: "Сгенерировано как итоговая задача повышенной сложности",
            answerInputType: AnswerInputType.NUMBER,
            // Английский = 20/2 = 10. Немецкий = 20/4 = 5. Французский = 20 - 10 - 5 = 5.
            correctAnswer: 5
          },
          {
            id: "0629_russian_final_long_sentence",
            text: "Итоговое задание: составь предложение из 4-5 слов про свои летние планы. (Творческое задание)",
            category: TaskCategory.RUSSIAN,
            source: "Сгенерировано как итоговое творческое задание",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Расскажи о своих планах родителям!"
          }
        ]
      }
    ]
  },
  // Day 30: 30 июня, понедельник
  {
    id: "2025-06-30",
    date: new Date(2025, 5, 30),
    dayName: "понедельник",
    title: "Итоговые испытания",
    sessions: [
      {
        name: "Утренняя сессия",
        duration: "25 минут",
        tasks: [
          {
            id: "0630_math_final_berries_puzzle",
            text: "Финальная математическая головоломка: Три друга собирали ягоды. Первый собрал в 2 раза больше второго, а третий - столько, сколько первый и второй вместе. Всего собрали 24 ягоды. Сколько ягод собрал второй друг?",
            category: TaskCategory.MATH,
            source: "Адаптировано как финальное испытание из сложных задач олимпиадного уровня (число изменено для целочисленного ответа)",
            answerInputType: AnswerInputType.NUMBER,
            // Вт = x. П = 2x. Тр = x + 2x = 3x.
            // x + 2x + 3x = 24 => 6x = 24 => x = 4.
            // Второй собрал x = 4.
            correctAnswer: 4
          },
          {
            id: "0630_complex_final_word_olympiad",
            text: "Итоговое комплексное задание: В слове ОЛИМПИАДА 9 букв. Составь из этих букв 2 новых слова (каждое не менее 3 букв). Напиши их через запятую.",
            category: TaskCategory.COMPLEX,
            source: "Сгенерировано как финальное задание, объединяющее русский язык и математику",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Примеры: лампа, мода, дом, мило, пила, Дима, Оля. Проверьте с родителями."
          }
        ]
      },
      {
        name: "Дневная сессия",
        duration: "20 минут",
        tasks: [
          {
            id: "0630_logic_final_zoo_puzzle",
            category: TaskCategory.LOGIC,
            source: "Адаптировано из классических логических задач как финальное испытание (числа изменены)",
            answerInputType: AnswerInputType.TEXT,
            // Задача изменена в комментарии, и текст ниже соответствует измененной задаче.
            // Первоначальный текст про львов и тигров удален.
            correctAnswer: "6 кур, 4 кролика", 
            answerHint: "__ кур, __ кроликов",
            text: "Финальная логическая задача: В зоопарке куры и кролики. Всего 10 голов и 28 ног. Сколько кур и кроликов? (Напиши: X кур, Y кроликов)",
          },
          {
            id: "0630_creative_final_emblem",
            text: "Праздничное задание: придумай и нарисуй эмблему 'Юный олимпиец' для всех ребят, которые успешно прошли июньскую программу. (Творческое задание)",
            category: TaskCategory.CREATIVE,
            source: "Сгенерировано для торжественного завершения программы",
            answerInputType: AnswerInputType.PARENT_CHECK,
            correctAnswer: "Покажи родителям свою замечательную эмблему!",
            requiresParentalDrawing: true
          }
        ]
      }
    ]
  }
];

export default june2025Schedule;
