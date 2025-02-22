import { Joi, celebrate } from 'celebrate';
import { BadRequest } from '../errors';

const validateId = (id: string) => {
  if (!isNaN(Number(id)) && Number(id) >= 1) {
    return id;
  }
  throw new BadRequest(': invalid Id');
};

const validatePage = (page: string) => {
  if (!isNaN(Number(page)) && Number(page) >= 1) {
    return page;
  }
  throw new BadRequest(': invalid Page');
};

class Validation {
  getAllTopicsQuery = celebrate({
    query: Joi.object().keys({
      page: Joi.string().custom(validatePage),
    }),
  });
  createTopicInfo = celebrate({
    body: Joi.object().keys({
      title: Joi.string().required().min(3).max(30),
      description: Joi.string().required().min(20).max(500),
      creator: Joi.string().required(),
      creatorId: Joi.number().integer().required(),
    }),
  });
  createCommentInfo = celebrate({
    body: Joi.object().keys({
      message: Joi.string().required().min(20).max(500),
      creator: Joi.string().required(),
      creatorId: Joi.number().integer().required(),
    }),
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
  });
  idParams = celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
  });
  deleteTopic = celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
  });
  deleteComment = celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
  });
  addReaction = celebrate({
    body: Joi.object().keys({
      emoji: Joi.string().required().max(10),
      type: Joi.string().valid('topic', 'comment').required(),
      creatorId: Joi.number().integer().min(1).required(),
    }),
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
  });
  getReactions = celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
    query: Joi.object().keys({
      type: Joi.string().valid('topic', 'comment').required(),
    }),
  });
  deleteReaction = celebrate({
    body: Joi.object().keys({
      emoji: Joi.string().required().max(10),
      type: Joi.string().valid('topic', 'comment').required(),
      creatorId: Joi.number().integer().min(1).required(),
    }),
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
  });
  updateTheme = celebrate({
    params: Joi.object().keys({
      id: Joi.string().required().custom(validateId),
    }),
    body: Joi.object().keys({
      darkTheme: Joi.boolean().required(),
    }),
  });
}

const validation = new Validation();

export { validation };
