type Actions = {
  type: string;
  payload: string;
}

export const ProductReducer = (state: string, action: Actions) => {
  const { type, payload } = action
  console.log(type)
  console.log(payload)
  console.log(state)
	// switch (type) {

	// }
}