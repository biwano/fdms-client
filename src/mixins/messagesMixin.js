export default {
	methods: {
		message(category, type, text) {
			this.$store.commit("message", {category, type, text});
		},
		clear_messages(category) {
			if (category === undefined) category = "global";
			this.$store.commit("clear_messages", category);
		},
		clear_message(message) {
			this.$store.commit("clear_message", message.uuid);
		},
		error(category, text) {
			this.clear_messages(category);
			this.message(category, "error", text);
		},
		global_error(text) {
			this.error("global", text);
		},
		info(category, text) {
			this.clear_messages(category);
			this.message(category, "info", text);
		},
		global_info(text) {
			this.info("global", text);
		}
	}
}