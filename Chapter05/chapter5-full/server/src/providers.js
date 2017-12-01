import { collectionFactory, modelFactory } from './utils/database'

const idIndex = {
  fieldName: '_id',
  unique: true,
}

export const Users = modelFactory(collectionFactory('users', idIndex))
export const Tickets = modelFactory(collectionFactory('tickets', idIndex))
export const Questions = modelFactory(collectionFactory('questions', idIndex))

// Init
export async function initData () {
  // FAQ
  Questions.remove({}, {}, true)
  Questions.insert([
    {
      title: 'Where is my order?',
      content: `Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros.`,
    },
    {
      title: 'Where do you ship?',
      content: 'Qui et quod dolorem eaque. Soluta ut dolor dolor debitis. Molestias sunt in necessitatibus odit quo odio omnis odit. Atque deleniti reprehenderit sapiente consectetur consectetur quia autem repudiandae.',
    },
    {
      title: 'How do i return an item?',
      content: 'Voluptate cupiditate officia quia accusantium. Fugiat ut praesentium quia ut et labore reiciendis fugit. Voluptas eos maiores itaque aut. Sequi harum dolor neque sunt rerum iste ducimus. Quas sapiente cumque voluptatem repudiandae ipsum. Natus quis aut aut fugiat. Nisi non sed reprehenderit mollitia commodi et qui error. Velit autem omnis et repellendus facere libero praesentium. Sit aut possimus eligendi consectetur beatae. Iste et officia delectus modi ratione inventore enim voluptatem.',
    },
    {
      title: 'Why has my order been cancelled?',
      content: 'Consequatur labore repellat quo eaque provident natus et. Fuga molestias quibusdam quam maiores at debitis. Molestias occaecati iste dignissimos voluptatem quis est quidem. Expedita natus porro id ut nesciunt cupiditate quis. Doloribus suscipit ipsa ipsam qui. Voluptatem voluptatem ut numquam ex natus iste.',
    },
    {
      title: 'Why won’t my discount code work?',
      content: 'Inventore iste reprehenderit aut reiciendis repellendus. Quas cumque aliquam accusantium et itaque quisquam voluptatem. Commodi quo quia occaecati dicta ratione qui at tempore. At saepe est et saepe accusamus voluptates.',
    },
  ])
}
