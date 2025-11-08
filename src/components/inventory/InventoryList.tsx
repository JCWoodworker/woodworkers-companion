/**
 * Inventory List Component
 * Renders list of inventory items for a specific category
 */

import { CustomCategoryItem } from "@/src/types/customCategory"
import { Consumable, Hardware, LumberEntry, Tool } from "@/src/types/inventory"
import { router } from "expo-router"
import React from "react"
import { EmptyState } from "../common/EmptyState"
import { InventoryCard } from "./InventoryCard"

interface Props {
	type: "lumber" | "tool" | "consumable" | "hardware" | "custom"
	items: (LumberEntry | Tool | Consumable | Hardware | CustomCategoryItem)[]
	searchQuery: string
	onDelete: (id: string, name: string) => void
}

export function InventoryList({ type, items, searchQuery, onDelete }: Props) {
	const getEmptyState = () => {
		switch (type) {
			case "lumber":
				return {
					icon: "tree" as const,
					title: searchQuery ? "No lumber found" : "No lumber in inventory",
					description: searchQuery
						? "Try adjusting your search"
						: "Add lumber from your stock or recent purchases",
					actionLabel: searchQuery ? undefined : "Add Lumber",
					onAction: searchQuery
						? undefined
						: () => router.push("/inventory/add?type=lumber" as any),
				}
			case "tool":
				return {
					icon: "hammer-wrench" as const,
					title: "No tools in registry",
					description: "Track your tools and maintenance schedules",
					actionLabel: "Add Tool",
					onAction: () => router.push("/inventory/add?type=tool" as any),
				}
			case "consumable":
				return {
					icon: "package-variant" as const,
					title: "No consumables tracked",
					description: "Track sandpaper, glue, finish, and other supplies",
					actionLabel: "Add Consumable",
					onAction: () => router.push("/inventory/add?type=consumable" as any),
				}
			case "hardware":
				return {
					icon: "screw-machine-flat-top" as const,
					title: "No hardware tracked",
					description: "Track screws, hinges, slides, and other hardware",
					actionLabel: "Add Hardware",
					onAction: () => router.push("/inventory/add?type=hardware" as any),
				}
			case "custom":
				return {
					icon: "shape-plus" as const,
					title: "No custom items",
					description: "Create custom categories for your unique needs",
					actionLabel: "Manage Categories",
					onAction: () => router.push("/inventory/categories" as any),
				}
		}
	}

	if (items.length === 0) {
		const emptyState = getEmptyState()
		return <EmptyState {...emptyState} />
	}

	const getItemName = (item: any) => {
		if ("species" in item) return item.species
		return item.name
	}

	return (
		<>
			{items.map((item) => (
				<InventoryCard
					key={item.id}
					item={item}
					type={type}
					onPress={() =>
						router.push(`/inventory/detail/${item.id}?type=${type}` as any)
					}
					onDelete={() => onDelete(item.id, getItemName(item))}
					showLowStockBadge={type === "consumable" || type === "hardware"}
				/>
			))}
		</>
	)
}
