export const CAPTURE_DATA = 'CAPTURE_DATA';
export const CAPTURE_DATA_SUCCESS = 'CAPTURE_DATA_SUCCESS';


export const updateData = () => ({
  type: 'CAPTURE_DATA',
});

export const storeSockData = data => ({
  type: 'CAPTURE_DATA_SUCCESS',
  payload: data
})
