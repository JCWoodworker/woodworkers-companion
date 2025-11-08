/**
 * Add Consumable Form Component
 */

import { useFieldVisibility } from "@/src/hooks/useFieldVisibility"
import { calculatorStyles } from "@/src/theme"
import React from "react"
import { TextInput } from "react-native-paper"

interface ConsumableFormValues {
	name: string
	category: string
	quantity: string
	unit: string
	costPerUnit: string
	reorderLevel: string
	location: string
	notes: string
}

interface Props {
	values: ConsumableFormValues
	onValueChange: <K extends keyof ConsumableFormValues>(key: K, value: ConsumableFormValues[K]) => void
}

export function AddConsumableForm({ values, onValueChange }: Props) {
	const fieldVisibility = useFieldVisibility()

	return (
		<>
			<TextInput
				label="Item Name *"
				value={values.name}
				onChangeText={(text) => onValueChange("name", text)}
				mode="outlined"
				style={calculatorStyles.input}
			/>

			<TextInput
				label="Quantity *"
				value={values.quantity}
				onChangeText={(text) => onValueChange("quantity", text)}
				keyboardType="decimal-pad"
				mode="outlined"
				style={calculatorStyles.input}
			/>

			<TextInput
				label="Unit *"
				value={values.unit}
				onChangeText={(text) => onValueChange("unit", text)}
				mode="outlined"
				style={calculatorStyles.input}
				placeholder="e.g., sheets, oz, gal"
			/>

			{fieldVisibility.consumable.costPerUnit && (
				<TextInput
					label="Cost per Unit"
					value={values.costPerUnit}
					onChangeText={(text) => onValueChange("costPerUnit", text)}
					keyboardType="decimal-pad"
					mode="outlined"
					style={calculatorStyles.input}
					left={<TextInput.Icon icon="currency-usd" />}
				/>
			)}

			{fieldVisibility.consumable.reorderLevel && (
				<TextInput
					label="Reorder Level"
					value={values.reorderLevel}
					onChangeText={(text) => onValueChange("reorderLevel", text)}
					keyboardType="decimal-pad"
					mode="outlined"
					style={calculatorStyles.input}
					placeholder="Alert when quantity reaches this level"
				/>
			)}

			{fieldVisibility.consumable.location && (
				<TextInput
					label="Location"
					value={values.location}
					onChangeText={(text) => onValueChange("location", text)}
					mode="outlined"
					style={calculatorStyles.input}
				/>
			)}

			<TextInput
				label="Notes"
				value={values.notes}
				onChangeText={(text) => onValueChange("notes", text)}
				mode="outlined"
				multiline
				numberOfLines={3}
				style={calculatorStyles.input}
			/>
		</>
	)
}
