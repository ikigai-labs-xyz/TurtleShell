import { useState, useEffect } from "react"
import axios from "axios"
import { ML_MODEL_URL } from "../utils"

const useMLModel = () => {
	const [data, setData] = useState(null)
	const [error, setError] = useState(null)
	const [loading, setLoading] = useState(true)

	const fetchMLModel = async (sourceCode) => {
		console.log(sourceCode)
		console.log(typeof sourceCode)
		// convert string to object
		// const startIndex = sourceCode.indexOf("{") + 2;
		// const endIndex = sourceCode.lastIndexOf("}");
		// const formattedSourceCode = sourceCode.substring(startIndex, endIndex).trim();
		// console.log(sourceCode);
		// const sourceCodeObj = JSON.parse(formattedSourceCode);
		// const sourceCodes = Object.keys(sourceCodeObj.sources);
		// const firstCode = sourceCode.sources[sourceCodes[0]].content;

		try {
			setLoading(true)
			// fetch the audit from the Machine Learning Model and pass the source code
			const response = await fetch(ML_MODEL_URL, {
				method: "POST",
				//mode: 'no-cors',
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ target_contract: sourceCode }),
			})
			const result = await response.json()
			console.log(result)
			setData(result)
			setLoading(false)
		} catch (error) {
			console.log(error)
			setError(error)
			setData([])
			setLoading(false)
		}
	}

	return { data, error, loading, fetchMLModel }
}

export default useMLModel
