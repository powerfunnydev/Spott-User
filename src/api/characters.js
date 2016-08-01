import { get, NotFoundError, UnauthorizedError, UnexpectedError } from './request';
import { transformCharacter } from './transformers';

export async function getMediumCharacters (baseUrl, authenticationToken, locale, { mediumId, page = 0 }) {
  try {
    const { body: { data } } = await get(authenticationToken, locale, `${baseUrl}/v003/media/media/${mediumId}/cast?pageSize=50&page=${page}`);
    // TODO: Add pagination
    return { data: data.map(transformCharacter) };
  } catch (error) {
    switch (error.statusCode) {
      case 403:
        throw new UnauthorizedError();
      case 404:
        throw new NotFoundError('medium', error);
    }
    throw new UnexpectedError(error);
  }
}