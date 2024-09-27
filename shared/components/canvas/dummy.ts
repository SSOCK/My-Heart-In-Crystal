export type Message = {
  content: string;
  sendAt: string; // Changed from created to sendAt
  decoration_color: string;
  decoration_id: number;
  id: number;
  is_deleted: boolean;
  letter_id: number;
  location: number;
  opened: string | null;
  sender: string;
  snowball_id: number;
  user_id: number;
  sentiment: 'positive' | 'neutral' | 'negative';
  confidence: number;
};

// Function to generate a random date in the format "YYYY-MM-DD HH:mm"
const getRandomDate = (): string => {
  const start = new Date(2020, 0, 1); // Starting from January 1, 2020
  const end = new Date(); // Current date
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  const year = randomDate.getFullYear();
  const month = String(randomDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const day = String(randomDate.getDate()).padStart(2, '0');
  const hours = String(randomDate.getHours()).padStart(2, '0');
  const minutes = String(randomDate.getMinutes()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

export const messageLists: Message[] = [
  {
    content: '안녕 나는 민수야\n 올 한해도 수고 많았어^^',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#911f1f',
    decoration_id: 1,
    id: 1,
    is_deleted: false,
    letter_id: 3,
    location: 1,
    opened: '비밀',
    sender: '박민수',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 10,
  },
  {
    content: '메리크리스마스~\n 내년에도 사이좋게 지내자!!.',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#3a911f',
    decoration_id: 2,
    id: 2,
    is_deleted: false,
    letter_id: 5,
    location: 2,
    opened: null,
    sender: '김찬우',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 1,
  },
  {
    content:
      '나랑 마인크래프트 해줘서 고마워\n앞으로도 나랑 마인크래프트 같이하자',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#efff0a',
    decoration_id: 4,
    id: 3,
    is_deleted: false,
    letter_id: 5,
    location: 3,
    opened: null,
    sender: '스티브',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 100,
  },
  {
    content:
      '선물은 작다 해도 큰 마음이 담겨있어요.\n 나의 작은 선물로 당신을 기쁘게 만들고 싶어요. 🎁❤️',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#1f4391',
    decoration_id: 4,
    id: 4,
    is_deleted: false,
    letter_id: 5,
    location: 4,
    opened: null,
    sender: '민진서',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 70,
  },
  {
    content:
      '친구야,\n 내가 갖고 있는 최고의 선물은 너와 함께 있는 시간이에요.\n 이번 크리스마스를 잊지 못할 거에요. 🎄🕰️',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#00ea00',
    decoration_id: 1,
    id: 5,
    is_deleted: false,
    letter_id: 5,
    location: 5,
    opened: null,
    sender: '알로하',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'neutral',
    confidence: 80,
  },
  {
    content:
      '친애하는 친구, 크리스마스가 다가오네요!\n특별한 날을 함께 보내고 싶어요. \n🎄🎅❤️',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#0ff000',
    decoration_id: 3,
    id: 6,
    is_deleted: false,
    letter_id: 4,
    location: 6,
    opened: '비밀',
    sender: '찰리',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 99,
  },
  {
    content:
      '이번 크리스마스에는 따뜻한 차 한 잔과 함께 뜻깊은 이야기를 나눠보는 건 어떨까요? ☕🎄🎁',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#ffff00',
    decoration_id: 3,
    id: 7,
    is_deleted: false,
    letter_id: 1,
    location: 7,
    opened: '',
    sender: '루피',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 88,
  },
  {
    content: '너무 슬픈 한 해였어..\n2024년은 행복했으면 좋겠다🙏',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#ffff00',
    decoration_id: 2,
    id: 8,
    is_deleted: false,
    letter_id: 1,
    location: 8,
    opened: '',
    sender: '눈물',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'negative',
    confidence: 75,
  },
  {
    content: '벌써 2024년이야,, 난 나이먹기 싫어😢',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#d12b2b',
    decoration_id: 3,
    id: 9,
    is_deleted: false,
    letter_id: 1,
    location: 9,
    opened: '',
    sender: '2023 가지마',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'negative',
    confidence: 40,
  },
  {
    content: '올 한 해도 너 덕분에 행복했어😊',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#d15a2b',
    decoration_id: 2,
    id: 10,
    is_deleted: false,
    letter_id: 1,
    location: 10,
    opened: '',
    sender: '맞춰봐',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 60,
  },
  {
    content: '내년에도 올해처럼 행복하게 흐르기를 바라🎄',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#65b182',
    decoration_id: 1,
    id: 11,
    is_deleted: false,
    letter_id: 1,
    location: 11,
    opened: '',
    sender: '선물',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 25,
  },
  {
    content: '이번 크리스마스에는 너랑 같이 있고 싶어❤️',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#8865b1',
    decoration_id: 2,
    id: 12,
    is_deleted: false,
    letter_id: 1,
    location: 12,
    opened: '',
    sender: '쿠키',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'neutral',
    confidence: 50,
  },
  {
    content:
      '난 올해 정말 힘들었어..\n내년에는 같이 좋은 일만 가득했으면 좋겠다💦',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#ffff00',
    decoration_id: 3,
    id: 13,
    is_deleted: false,
    letter_id: 1,
    location: 13,
    opened: '',
    sender: 'abc',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'negative',
    confidence: 40,
  },
  {
    content: '2024년 정말 설레ㅎㅎㅎㅎ\n또 어떤 좋은 일들이 기다리고 있을까?❤️',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#530fa0',
    decoration_id: 1,
    id: 14,
    is_deleted: false,
    letter_id: 1,
    location: 14,
    opened: '',
    sender: '햅삐',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'positive',
    confidence: 90,
  },
  {
    content:
      '제 편지가 기쁨이 되었으면 좋겠어요\n올 한해 정말 수고 많았어요\n항상 잘하고 있으니까 걱정하지말고 킵고잉❗',
    sendAt: getRandomDate(), // Random date
    decoration_color: '#0fa08d',
    decoration_id: 1,
    id: 15,
    is_deleted: false,
    letter_id: 1,
    location: 15,
    opened: '',
    sender: '마라톤',
    snowball_id: 1,
    user_id: 1,
    sentiment: 'neutral',
    confidence: 88,
  },
];
