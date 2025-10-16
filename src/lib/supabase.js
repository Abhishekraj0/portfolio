import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export const portfolioAPI = {
  // Get portfolio data
  async getPortfolioData() {
    const { data, error } = await supabase
      .from('portfolio_config')
      .select('*')
      .single()
    
    if (error) throw error
    return data
  },

  // Update portfolio data
  async updatePortfolioData(updates) {
    const { data, error } = await supabase
      .from('portfolio_config')
      .update(updates)
      .eq('id', 1)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Get experiences
  async getExperiences() {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('start_date', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add/Update experience
  async upsertExperience(experience) {
    const { data, error } = await supabase
      .from('experiences')
      .upsert(experience)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete experience
  async deleteExperience(id) {
    const { error } = await supabase
      .from('experiences')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get projects
  async getProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return data
  },

  // Add/Update project
  async upsertProject(project) {
    const { data, error } = await supabase
      .from('projects')
      .upsert(project)
      .select()
      .single()
    
    if (error) throw error
    return data
  },

  // Delete project
  async deleteProject(id) {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)
    
    if (error) throw error
  },

  // Get skills
  async getSkills() {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('category', { ascending: true })
    
    if (error) throw error
    return data
  },

  // Update skills
  async updateSkills(skills) {
    // Delete existing skills
    await supabase.from('skills').delete().neq('id', 0)
    
    // Insert new skills
    const { data, error } = await supabase
      .from('skills')
      .insert(skills)
      .select()
    
    if (error) throw error
    return data
  },

  // Upload file
  async uploadFile(file, bucket = 'portfolio-assets') {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}.${fileExt}`
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file)
    
    if (error) throw error
    
    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName)
    
    return publicUrl
  },

  // Authentication
  async signIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    
    if (error) throw error
    return data
  },

  async signOut() {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser()
    return user
  }
}