import { writable } from "svelte/store";
import {
  build_word_adjency_list,
  map_named_nodes_to_index,
} from "$lib/adjency_list_from_edge_set";
import { first } from "$lib/samples_values";


const edge_set = first.dictionary;

const word_adjency_list = build_word_adjency_list(edge_set);
const mapped_nodes = map_named_nodes_to_index(word_adjency_list);


const nodes_stats_state = Object.entries(mapped_nodes).map(([name, index]) => ({
  id: name,
  index: index,
  neighbors: [...word_adjency_list[name].map((edge) => mapped_nodes[edge])]
}));


const nodes_position_by_id = Object.keys(mapped_nodes).reduce((acc, id) => ({...acc, [id]: {x:0, y:0}}), {})

export const nodes_stats = writable(nodes_stats_state)

export const nodes_position = writable(nodes_position_by_id)

export const updateNodePosition = (id: string, newPosition) => {
  nodes_position.update((nodes_pos) => ({...nodes_pos, [id]: newPosition}))
}


export const node_selection = writable("");