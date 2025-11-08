/**
 * Inventory Header Component
 * Displays title, stats, and action buttons
 */

import { spacing } from "@/src/theme"
import { formatCurrency } from "@/src/utils"
import { router } from "expo-router"
import React from "react"
import { StyleSheet, View } from "react-native"
import { IconButton, Text, useTheme } from "react-native-paper"

interface Props {
	totalBoardFeet: number
	totalLumberValue: number
	totalInventoryValue: number
	showLumberStats: boolean
	showAnalytics: boolean
}

export function InventoryHeader({
	totalBoardFeet,
	totalLumberValue,
	totalInventoryValue,
	showLumberStats,
	showAnalytics,
}: Props) {
	const theme = useTheme()

	return (
		<View style={styles.header}>
			<View style={styles.titleRow}>
				<Text variant="displaySmall" style={styles.title}>
					Inventory
				</Text>
				<View style={styles.headerActions}>
					{showAnalytics && (
						<IconButton
							icon="chart-bar"
							size={24}
							onPress={() => router.push("/inventory/analytics" as any)}
						/>
					)}
					<IconButton
						icon="cog"
						size={24}
						onPress={() => router.push("/settings/inventory" as any)}
					/>
				</View>
			</View>

			{showLumberStats && (
				<Text variant="bodyMedium" style={styles.subtitle}>
					{totalBoardFeet.toFixed(0)} BF • {formatCurrency(totalLumberValue)}
				</Text>
			)}

			{showLumberStats && showAnalytics && (
				<Text
					variant="bodySmall"
					style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}
				>
					Total inventory value: {formatCurrency(totalInventoryValue)}
				</Text>
			)}
		</View>
	)
}

const styles = StyleSheet.create({
	header: {
		marginBottom: spacing.lg,
	},
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
	},
	headerActions: {
		flexDirection: "row",
	},
	subtitle: {
		marginTop: spacing.xs,
	},
})
