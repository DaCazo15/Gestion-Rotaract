import { createClient } from '@supabase/supabase-js'

const API_URL = import.meta.env.VITE_URL
const API_KEY = import.meta.env.VITE_API_KEY
const supabase = createClient(API_URL, API_KEY)

export function useSupabase() {

  const getTable = async (table) => {
    const { data, error } = await supabase.from(table).select('*')
    if (error) {
      console.error(`Error en getTable (${table}):`, error.message)
      return []
    }
    return data
  }

  const setTable = async (table, dataValue) => {
    const { data, error } = await supabase.from(table).insert(dataValue).select()
    if (error) {
      console.error(`Error en setTable (${table}):`, error.message)
      return { success: false, error }
    }
    return { success: true, data }
  }

  const getSelectTable = async (table, clubId) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('club', clubId)

    if (error) {
      console.error(`Error en getSelectTable (${table}):`, error.message)
      return []
    }
    return data
  }
  const getSelectColumnTable = async (table, clubId, fechaHoy) => {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('club', clubId)
      .lte('fechaInicio', fechaHoy)
      .gte('fechaFin', fechaHoy)
      .maybeSingle();
    if (error) {
      console.error(`Error en getSelectColumnTable (${table}):`, error.message)
      return []
    }
    return data
  }

  const getLengthTable = async (table, clubId) => {
    const { count, error } = await supabase
      .from(table)
      .select('*', { count: 'exact', head: true })
      .eq('club', clubId)

    if (error) {
      console.error(`Error en getLengthTable (${table}):`, error.message)
      return 0
    }
    return count || 0
  }

  const getBalance = async (table, clubId) => {
    const { data, error } = await supabase
      .from(table)
      .select('monto, tipo')
      .eq('club', clubId);

    if (error || !data) return 0;
    const balance = data.reduce((acc, mov) => {
      const tipo = mov.tipo.toLowerCase();
      const monto = parseFloat(mov.monto) || 0;

      return tipo === 'ingreso'
        ? acc + monto
        : acc - monto;
    }, 0);

    return balance > 0 ? `$${balance}` : 0;
  };


  return {
    supabase,
    getTable,
    setTable,
    getSelectTable,
    getLengthTable,
    getBalance,
    getSelectColumnTable
  }
}
