import { useState } from 'react';

const useInputState = (initialVal = '', resetVal = '') => {
	const [ state, setState ] = useState(initialVal);

	const handleChange = (evt) => setState(evt.target.value);
	const reset = () => setState(resetVal);
	return [ state, handleChange, reset ];
};

export default useInputState;
