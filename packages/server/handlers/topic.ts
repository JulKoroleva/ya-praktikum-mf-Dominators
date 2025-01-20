import { ITopic } from '../models/topic';
import { Topic } from '../init';

// Создание пользователя
export async function createTopic(args: Partial<ITopic>) {
  return Topic.create({ ...args });
}

export async function getAllTopics() {
  return Topic.findAll();
}
