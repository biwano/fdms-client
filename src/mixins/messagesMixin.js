export default {
	methods: {
		message(category, type, text) {
			this.$store.commit("message", {category, type, text});
		},
		clearMessages(category) {
			if (category === undefined) category = "global";
			this.$store.commit("clearMessages", category);
		},
		error(category, text) {
			this.clearMessages(category);
			this.message(category, "error", text);
		},
		globalError(text) {
			this.error("global", text);
		}
	}
}