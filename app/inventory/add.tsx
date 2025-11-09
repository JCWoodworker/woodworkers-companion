/**
 * Add Inventory Item Screen
 * Universal add screen for all inventory types - REFACTORED
 */

import { AddConsumableForm } from "@/src/components/inventory/forms/AddConsumableForm"
import { AddHardwareForm } from "@/src/components/inventory/forms/AddHardwareForm"
import { AddLumberForm } from "@/src/components/inventory/forms/AddLumberForm"
import { AddToolForm } from "@/src/components/inventory/forms/AddToolForm"
import { useFormState } from "@/src/hooks"
import { usePlatformSafeArea } from "@/src/hooks/usePlatformSafeArea"
import { useInventoryStore } from "@/src/store/inventoryStore"
import { calculatorStyles, spacing } from "@/src/theme"
import { safeParseFloat } from "@/src/utils"
import { router, useLocalSearchParams } from "expo-router"
import React, { useState } from "react"
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native"
import { Button, Card, SegmentedButtons, useTheme } from "react-native-paper"

export default function AddInventoryItemScreen() {
	const theme = useTheme()
	const { contentPaddingBottom } = usePlatformSafeArea()
	const { type: paramType } = useLocalSearchParams<{ type?: string }>()
	const [itemType, setItemType] = useState<
		"lumber" | "tool" | "consumable" | "hardware"
	>((paramType as any) || "lumber")

	const { addLumber, addTool, addConsumable, addHardware } = useInventoryStore()

	const lumberForm = useFormState({
		species: "",
		thickness: "1",
		width: "",
		length: "",
		boardFeet: "",
		costPerBF: "",
		location: "",
		notes: "",
		moistureContent: "",
		supplier: "",
	})

	const toolForm = useFormState({
		name: "",
		category: "",
		brand: "",
		model: "",
		location: "",
		notes: "",
	})

	const consumableForm = useFormState({
		name: "",
		category: "",
		quantity: "",
		unit: "pieces",
		costPerUnit: "",
		reorderLevel: "",
		location: "",
		notes: "",
	})

	const hardwareForm = useFormState({
		name: "",
		category: "",
		size: "",
		material: "",
		quantity: "",
		unit: "pieces",
		costPerUnit: "",
		reorderLevel: "",
		location: "",
		notes: "",
	})

	const handleSave = () => {
		if (itemType === "lumber") {
			const bf = safeParseFloat(lumberForm.values.boardFeet)
			const cost = safeParseFloat(lumberForm.values.costPerBF)

			if (lumberForm.values.species.trim() && bf > 0 && cost > 0) {
				addLumber({
					species: lumberForm.values.species,
					thickness: safeParseFloat(lumberForm.values.thickness, 1),
					width: safeParseFloat(lumberForm.values.width) || undefined,
					length: safeParseFloat(lumberForm.values.length) || undefined,
					boardFeet: bf,
					costPerBF: cost,
					location: lumberForm.values.location || undefined,
					notes: lumberForm.values.notes || undefined,
					moistureContent:
						safeParseFloat(lumberForm.values.moistureContent) || undefined,
					supplier: lumberForm.values.supplier || undefined,
				})
				router.back()
			}
		} else if (itemType === "tool") {
			if (toolForm.values.name.trim()) {
				addTool({
					name: toolForm.values.name,
					category: toolForm.values.category || undefined,
					brand: toolForm.values.brand || undefined,
					model: toolForm.values.model || undefined,
					location: toolForm.values.location || undefined,
					notes: toolForm.values.notes || undefined,
				})
				router.back()
			}
		} else if (itemType === "consumable") {
			const qty = safeParseFloat(consumableForm.values.quantity)

			if (consumableForm.values.name.trim() && qty > 0) {
				addConsumable({
					name: consumableForm.values.name,
					category: consumableForm.values.category || undefined,
					quantity: qty,
					unit: consumableForm.values.unit,
					costPerUnit:
						safeParseFloat(consumableForm.values.costPerUnit) || undefined,
					reorderLevel:
						safeParseFloat(consumableForm.values.reorderLevel) || undefined,
					location: consumableForm.values.location || undefined,
					notes: consumableForm.values.notes || undefined,
				})
				router.back()
			}
		} else if (itemType === "hardware") {
			const qty = safeParseFloat(hardwareForm.values.quantity)

			if (hardwareForm.values.name.trim() && qty > 0) {
				addHardware({
					name: hardwareForm.values.name,
					category: hardwareForm.values.category || undefined,
					size: hardwareForm.values.size || undefined,
					material: hardwareForm.values.material || undefined,
					quantity: qty,
					unit: hardwareForm.values.unit,
					costPerUnit:
						safeParseFloat(hardwareForm.values.costPerUnit) || undefined,
					reorderLevel:
						safeParseFloat(hardwareForm.values.reorderLevel) || undefined,
					location: hardwareForm.values.location || undefined,
					notes: hardwareForm.values.notes || undefined,
				})
				router.back()
			}
		}
	}

	const getCurrentForm = () => {
		switch (itemType) {
			case "lumber":
				return (
					<AddLumberForm
						values={lumberForm.values}
						onValueChange={lumberForm.setValue}
					/>
				)
			case "tool":
				return (
					<AddToolForm
						values={toolForm.values}
						onValueChange={toolForm.setValue}
					/>
				)
			case "consumable":
				return (
					<AddConsumableForm
						values={consumableForm.values}
						onValueChange={consumableForm.setValue}
					/>
				)
			case "hardware":
				return (
					<AddHardwareForm
						values={hardwareForm.values}
						onValueChange={hardwareForm.setValue}
					/>
				)
			default:
				return null
		}
	}

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
		>
			<View
				style={[styles.container, { backgroundColor: theme.colors.background }]}
			>
				<ScrollView
					contentContainerStyle={[styles.content, { paddingBottom: contentPaddingBottom + spacing.xl }]}
					keyboardShouldPersistTaps="handled"
				>
				<SegmentedButtons
					value={itemType}
					onValueChange={(value) => setItemType(value as any)}
					buttons={[
						{ value: "lumber", label: "Lumber", icon: "tree" },
						{ value: "tool", label: "Tool", icon: "hammer-wrench" },
						{
							value: "consumable",
							label: "Consumable",
							icon: "package-variant",
						},
						{
							value: "hardware",
							label: "Hardware",
							icon: "screw-machine-flat-top",
						},
					]}
					style={styles.typeSwitcher}
				/>

				<Card style={calculatorStyles.card} mode="elevated">
					<Card.Content>{getCurrentForm()}</Card.Content>
				</Card>

				<View style={styles.buttonContainer}>
					<Button
						mode="outlined"
						onPress={() => router.back()}
						style={styles.button}
					>
						Cancel
					</Button>

					<Button mode="contained" onPress={handleSave} style={styles.button}>
						Add to Inventory
					</Button>
				</View>
				</ScrollView>
			</View>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	content: {
		padding: spacing.base,
	},
	typeSwitcher: {
		marginBottom: spacing.lg,
	},
	buttonContainer: {
		flexDirection: "row",
		gap: spacing.md,
	},
	button: {
		flex: 1,
	},
})
