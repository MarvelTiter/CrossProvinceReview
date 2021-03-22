<template>
	<div class="limiter">
		<div class="container-table100">
			<div class="wrap-table100">
				<div class="table100">
					<table>
						<thead>
							<tr :class="[
									{
										'text-align-left': textAlign == 'left',
										'text-align-right':
											textAlign == 'right',
										'text-align-center':
											textAlign == 'center',
									},
									'table100-head',
								]">
								<th v-if="checkbox" class="hidden-xs-only">
									<input type="checkbox" id="CheckAll" ref="CheckBoxAll" v-model="SelectedAll" @click.stop="TableSelect(true)" /><label for="CheckAll">全选</label>
								</th>
								<th v-for="(col, i) in columns" :key="i" class="column" :class="col.ResponsiveClass">
									{{ col.Label }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(row, i) in data" :key="i" @click="RowClick($event, row)" :class="[
									{
										'text-align-left': textAlign == 'left',
										'text-align-right':
											textAlign == 'right',
										'text-align-center':
											textAlign == 'center',
									},
								]">
								<td v-if="checkbox" class="CheckBoxColumn hidden-xs-only">
									<input type="checkbox" v-model="row.IsSelected" @click.stop @change="TableSelect(false, row)" />
								</td>
								<td v-for="(col, j) in columns" :data-label="col.Label" :class="col.ResponsiveClass" :key="j">
									{{
										col.Formatter
											? col.Formatter(row[col.Prop])
											: row[col.Prop]
									}}
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			SelectedItems: [],
			SelectedAll: false,
		}
	},
	props: {
		columns: {
			type: Array,
			default: function() {
				return []
			},
		},
		data: {
			type: Array,
			default: function() {
				return []
			},
		},
		checkbox: {
			type: Boolean,
			default: function() {
				return false
			},
		},
		textAlign: {
			type: String,
			default: function() {
				return 'left'
			},
		},
	},
	methods: {
		RowClick(e, row) {
			if (e.target.className.indexOf('CheckBoxColumn') > -1) {
				this.$set(row, 'IsSelected', !row.IsSelected)
				this.TableSelect(false)
			} else {
				this.$emit('rowclick', row)
			}
		},
		ChangeState(state) {
			this.data.forEach(d => {
				this.$set(d, 'IsSelected', state)
			})
		},
		TableSelect(all) {
			if (all) {
				if (!this.SelectedAll) {
					this.SelectedItems = this.data
					this.ChangeState(true)
				} else {
					this.SelectedItems = []
					this.ChangeState(false)
				}
			} else {
				this.SelectedItems = this.data.filter(r => {
					return r.IsSelected
				})
			}
			if (
				this.SelectedItems.length !== this.data.length &&
				this.SelectedItems.length > 0
			) {
				this.$refs['CheckBoxAll'].indeterminate = true
			} else {
				this.$refs['CheckBoxAll'].indeterminate = false
			}
			this.$emit('selection-change', this.SelectedItems)
		},
	},
	mounted() {},
}
</script>
<style scoped lang="scss">
.limiter {
	width: 100%;
	margin: 0 auto;
	.container-table100 {
		display: -webkit-box;
		display: -webkit-flex;
		display: -moz-box;
		display: -ms-flexbox;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: wrap;
		.wrap-table100 {
			width: 100%;
		}
	}
}

.table100 {
	table {
		border-spacing: 1;
		border-collapse: collapse;
		background: white;
		border-radius: 5px;
		overflow: hidden;
		width: 100%;
		margin: 0 auto;
		position: relative;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
		* {
			position: relative;
		}

		td,
		th {
			padding-left: 8px;
		}
		.text-align-left {
			td,
			th {
				text-align: left;
			}
		}
		.text-align-right {
			td,
			th {
				text-align: right;
			}
		}
		.text-align-center {
			td,
			th {
				text-align: center;
			}
		}

		thead {
			tr {
				height: 60px;
				background: #fff;
				font-weight: bold;
			}
		}
		tbody {
			tr {
				height: 40px;
				font-family: OpenSans-Regular;
				font-size: 15px;
				color: #808080;
				line-height: 1.2;
				font-weight: unset;
				&:nth-child(odd) {
					background-color: #f5f5f5;
				}

				&:hover {
					color: #555555;
					background-color: #d1d1d1;
					cursor: pointer;
				}
			}
		}
	}

	@media screen and (max-width: 768px) {
		table {
			display: block;
			*,
			tr,
			td,
			th {
				display: block;
			}
			thead {
				display: none;
				th {
					font-family: OpenSans-Regular;
					font-size: 1em;
					color: #000;
					line-height: 1.2;
					font-weight: unset;
				}
			}
			tbody {
				tr {
					height: auto;
					font-size: 1em;
					padding: 1em 0;
					td {
						padding-left: 40% !important;
						margin: 1em 0;
						&:before {
							font-family: OpenSans-Regular;
							font-size: 1em;
							color: #000;
							line-height: 1.2;
							font-weight: unset;
							position: absolute;
							left: 1em;
							top: 0;
							content: attr(data-label);
						}
					}
				}
			}
			.text-align-left {
				td,
				th {
					text-align: left;
				}
			}
			.text-align-right {
				td,
				th {
					text-align: left;
				}
			}
			.text-align-center {
				td,
				th {
					text-align: left;
				}
			}
		}
	}
}

@media (max-width: 576px) {
}
</style>
