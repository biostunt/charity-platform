export const GET_AUTH_OBJECT_BY_ID_SERVICE = 'GET_AUTH_OBJECT_BY_ID_SERVICE';
export interface IGetAuthObjectByIdService {
  handle(props: { id: string | number }): Promise<Record<string, unknown>>;
}
