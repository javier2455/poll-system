export const AUTH_ERRORS = {
  USER_NOT_FOUND: 'User not found',
  USERS_NOT_FOUND: 'Users not found',
  INCORRECT_PASSWORD: 'Incorrect password',
  INVALID_TOKEN: 'Invalid token',
  NOT_TOKEN: 'No token, authorization denied'
}

export const AUTH_SUCCESS = {
  CORRECTS_CREDENTIALS: 'Correct credentials',
  LOGOUT: 'User logout of the system',
  PROFILE_INFO: 'User profile',
  USER_CREATED: 'New user created'
}

export const USERS_MESSAGES = {
  SATISFACTORY_SEARCH: 'Satisfactory_search',
  USER_NOT_FOUND: 'User not found',
  USERS_NOT_FOUND: 'Users not found',
  USER_CREATED: 'New user created',
  USER_UPDATED: 'New user updated',
  USER_DELETED: 'New user deleted',
  USER_INVALID_ROLE: 'Invalid role'
}

export const USER_FIELDS = {
  USERNAME_REQUIERED: 'Username is a required field',
  USERNAME_INVALID_TYPE: 'Username must be a string',
  FULLNAME_REQUIERED: 'Fullname is a required field',
  FULLNAME_INVALID_TYPE: 'Fullname must be a string',
  PASSWORD_REQUIERED: 'Password is a required field',
  PASSWORD_MIN: 'The password must have at least 8 characters'
}

export const USER_ROLES = {
  USER: 'USER',
  POWER_USER: 'POWER USER',
  ADMIN: 'ADMIN'
}

export const POLL_FIELDS = {
  TITLE_REQUIERED: 'Title is a required field',
  TITLE_INVALID_TYPE: 'Title must be a string',
  FIELDS_REQUIERED: 'Fields is a required field',
  FIELDS_INVALID_TYPE: 'Fields must be an array of object',
  STATE_REQUIERED: 'State is a required field',
  STATE_INVALID_TYPE: 'State must be a string'
}

export const POLL_MESSAGES = {
  SATISFACTORY_SEARCH: 'Satisfactory_search',
  POLL_NOT_FOUND: 'Poll not found',
  POLLS_NOT_FOUND: 'Polls not found',
  POLLS_NOT_UPDATED: 'Polls not updated',
  POLL_CREATED: 'New poll created',
  POLL_UPDATED: 'Poll updated',
  POLL_DELETED: 'Poll deleted',
  POLL_CLOSED: 'Poll closed',
  POLL_INVALID_ROLE: 'Invalid role',
  POLL_VOTE_UPDATED: 'Voting was completed',
  POLL_USER_ALREADY_VOTE: 'This user has already cast a vote',
  POLL_MISSING_INPUT_USERTHATVOTE: 'Input (userthatvote) is missing'
}
